import { Router } from "express";
import { db } from "@workspace/db";
import { galleryTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapItem(g: typeof galleryTable.$inferSelect) {
  return {
    id: g.id,
    imageUrl: g.imageUrl,
    caption: g.caption,
    category: g.category,
    sortOrder: g.sortOrder,
    isPublished: g.isPublished,
    createdAt: g.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(galleryTable)
    .where(eq(galleryTable.isPublished, true))
    .orderBy(asc(galleryTable.sortOrder));
  res.json(rows.map(mapItem));
});

router.get("/admin", requireAuth, async (_req, res) => {
  const rows = await db.select().from(galleryTable).orderBy(asc(galleryTable.sortOrder));
  res.json(rows.map(mapItem));
});

router.post("/", requireAuth, async (req, res) => {
  const [row] = await db.insert(galleryTable).values(req.body).returning();
  res.status(201).json(mapItem(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(galleryTable).set(req.body)
    .where(eq(galleryTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapItem(row));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.delete(galleryTable).where(eq(galleryTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
