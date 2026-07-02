import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

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

router.post("/", requireAuth, async (req, res) => {
  const [row] = await db.insert(testimonialsTable).values(req.body).returning();
  res.status(201).json(mapTestimonial(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(testimonialsTable).set(req.body).where(eq(testimonialsTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapTestimonial(row));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
