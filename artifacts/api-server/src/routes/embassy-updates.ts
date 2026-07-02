import { Router } from "express";
import { db, embassyUpdatesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapUpdate(u: typeof embassyUpdatesTable.$inferSelect) {
  return {
    id: u.id,
    country: u.country,
    flag: u.flag,
    headline: u.headline,
    summary: u.summary,
    content: u.content ?? null,
    publishedAt: u.publishedAt.toISOString(),
    createdAt: u.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(embassyUpdatesTable).orderBy(embassyUpdatesTable.publishedAt);
  res.json(rows.map(mapUpdate));
});

router.post("/", requireAuth, async (req, res) => {
  const body = { ...req.body };
  if (body.publishedAt) body.publishedAt = new Date(body.publishedAt);
  const [row] = await db.insert(embassyUpdatesTable).values(body).returning();
  res.status(201).json(mapUpdate(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const body = { ...req.body };
  if (body.publishedAt) body.publishedAt = new Date(body.publishedAt);
  const [row] = await db.update(embassyUpdatesTable).set(body).where(eq(embassyUpdatesTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapUpdate(row));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.delete(embassyUpdatesTable).where(eq(embassyUpdatesTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
