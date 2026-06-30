import { Router } from "express";
import { db, faqsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function mapFaq(f: typeof faqsTable.$inferSelect) {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category ?? null,
    sortOrder: f.sortOrder,
    createdAt: f.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(faqsTable).orderBy(faqsTable.sortOrder);
  res.json(rows.map(mapFaq));
});

router.post("/", async (req, res) => {
  const [row] = await db.insert(faqsTable).values(req.body).returning();
  res.status(201).json(mapFaq(row));
});

router.patch("/:id", async (req, res) => {
  const [row] = await db.update(faqsTable).set(req.body).where(eq(faqsTable.id, parseInt(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapFaq(row));
});

router.delete("/:id", async (req, res) => {
  await db.delete(faqsTable).where(eq(faqsTable.id, parseInt(req.params.id)));
  res.status(204).send();
});

export default router;
