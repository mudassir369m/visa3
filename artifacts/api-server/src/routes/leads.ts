import { Router } from "express";
import { db, leadsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapLead(l: typeof leadsTable.$inferSelect) {
  return {
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    subject: l.subject,
    message: l.message,
    source: l.source ?? null,
    visaCountry: l.visaCountry ?? null,
    status: l.status,
    notes: l.notes ?? null,
    createdAt: l.createdAt.toISOString(),
  };
}

router.post("/", async (req, res) => {
  const [row] = await db.insert(leadsTable).values({ ...req.body, status: "new" }).returning();
  res.status(201).json(mapLead(row));
});

router.get("/", requireAuth, async (_req, res) => {
  const rows = await db.select().from(leadsTable).orderBy(leadsTable.createdAt);
  res.json(rows.map(mapLead));
});

router.get("/:id", requireAuth, async (req, res) => {
  const [row] = await db.select().from(leadsTable).where(eq(leadsTable.id, parseInt(req.params.id as string)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapLead(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(leadsTable).set(req.body).where(eq(leadsTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapLead(row));
});

export default router;
