import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function mapTestimonial(t: typeof testimonialsTable.$inferSelect) {
  return {
    id: t.id,
    name: t.name,
    country: t.country,
    visaType: t.visaType,
    message: t.message,
    rating: t.rating,
    photoUrl: t.photoUrl ?? null,
    videoUrl: t.videoUrl ?? null,
    status: t.status,
    createdAt: t.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(testimonialsTable).where(eq(testimonialsTable.status, "published"));
  res.json(rows.map(mapTestimonial));
});

router.post("/", async (req, res) => {
  const [row] = await db.insert(testimonialsTable).values(req.body).returning();
  res.status(201).json(mapTestimonial(row));
});

router.patch("/:id", async (req, res) => {
  const [row] = await db.update(testimonialsTable).set(req.body).where(eq(testimonialsTable.id, parseInt(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapTestimonial(row));
});

router.delete("/:id", async (req, res) => {
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, parseInt(req.params.id)));
  res.status(204).send();
});

export default router;
