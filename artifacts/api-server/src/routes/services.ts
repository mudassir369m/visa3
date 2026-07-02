import { Router } from "express";
import { db, servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapService(s: typeof servicesTable.$inferSelect) {
  return {
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description,
    icon: s.icon,
    imageUrl: s.imageUrl ?? null,
    sortOrder: s.sortOrder,
    published: s.published,
    createdAt: s.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(servicesTable).orderBy(servicesTable.sortOrder);
  res.json(rows.filter(r => r.published).map(mapService));
});

router.post("/", requireAuth, async (req, res) => {
  const [row] = await db.insert(servicesTable).values(req.body).returning();
  res.status(201).json(mapService(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(servicesTable).set(req.body).where(eq(servicesTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapService(row));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.delete(servicesTable).where(eq(servicesTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
