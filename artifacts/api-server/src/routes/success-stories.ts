import { Router } from "express";
import { db } from "@workspace/db";
import { successStoriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapStory(s: typeof successStoriesTable.$inferSelect) {
  return {
    id: s.id,
    title: s.title,
    person: s.person,
    country: s.country,
    visaType: s.visaType,
    videoUrl: s.videoUrl ?? null,
    thumbnail: s.thumbnail ?? null,
    isPublished: s.isPublished,
    createdAt: s.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(successStoriesTable)
    .where(eq(successStoriesTable.isPublished, true));
  res.json(rows.map(mapStory));
});

router.post("/", requireAuth, async (req, res) => {
  const [row] = await db.insert(successStoriesTable).values(req.body).returning();
  res.status(201).json(mapStory(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(successStoriesTable).set(req.body)
    .where(eq(successStoriesTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapStory(row));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.delete(successStoriesTable).where(eq(successStoriesTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
