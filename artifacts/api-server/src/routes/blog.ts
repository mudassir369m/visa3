import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapPost(p: typeof blogPostsTable.$inferSelect) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    readTime: p.readTime,
    imageUrl: p.imageUrl ?? null,
    published: p.published,
    createdAt: p.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(blogPostsTable).where(eq(blogPostsTable.published, true));
  res.json(rows.map(mapPost));
});

router.get("/:slug", async (req, res) => {
  const [row] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, req.params.slug));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapPost(row));
});

router.post("/", requireAuth, async (req, res) => {
  const [row] = await db.insert(blogPostsTable).values(req.body).returning();
  res.status(201).json(mapPost(row));
});

router.patch("/:id/admin", requireAuth, async (req, res) => {
  const [row] = await db.update(blogPostsTable).set(req.body).where(eq(blogPostsTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapPost(row));
});

router.delete("/:id/admin", requireAuth, async (req, res) => {
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
