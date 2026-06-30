import { Router } from "express";
import { db, visasTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function mapVisa(v: typeof visasTable.$inferSelect) {
  return {
    id: v.id,
    country: v.country,
    slug: v.slug,
    flag: v.flag,
    headline: v.headline,
    description: v.description ?? null,
    visaTypes: v.visaTypes,
    processingDays: v.processingDays,
    successRate: v.successRate,
    requirements: v.requirements,
    documents: v.documents,
    fees: v.fees ?? null,
    imageUrl: v.imageUrl ?? null,
    sortOrder: v.sortOrder,
    published: v.published,
    createdAt: v.createdAt.toISOString(),
  };
}

// GET /api/visas
router.get("/", async (_req, res) => {
  const rows = await db.select().from(visasTable).orderBy(visasTable.sortOrder);
  res.json(rows.map(mapVisa));
});

// GET /api/visas/slug/:slug
router.get("/slug/:slug", async (req, res) => {
  const [row] = await db.select().from(visasTable).where(eq(visasTable.slug, req.params.slug));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapVisa(row));
});

// GET /api/visas/:id
router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(visasTable).where(eq(visasTable.id, parseInt(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapVisa(row));
});

// POST /api/visas
router.post("/", async (req, res) => {
  const [row] = await db.insert(visasTable).values(req.body).returning();
  res.status(201).json(mapVisa(row));
});

// PATCH /api/visas/:id
router.patch("/:id", async (req, res) => {
  const [row] = await db.update(visasTable).set(req.body).where(eq(visasTable.id, parseInt(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapVisa(row));
});

// DELETE /api/visas/:id
router.delete("/:id", async (req, res) => {
  await db.delete(visasTable).where(eq(visasTable.id, parseInt(req.params.id)));
  res.status(204).send();
});

export default router;
