import { Router } from "express";
import { db, toursTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function mapTour(t: typeof toursTable.$inferSelect) {
  return {
    id: t.id,
    title: t.title,
    slug: t.slug,
    category: t.category,
    description: t.description ?? null,
    days: t.days,
    nights: t.nights,
    price: t.price,
    originalPrice: t.originalPrice ?? null,
    inclusions: t.inclusions,
    imageUrl: t.imageUrl ?? null,
    published: t.published,
    sortOrder: t.sortOrder,
    createdAt: t.createdAt.toISOString(),
  };
}

router.get("/", async (req, res) => {
  const rows = await db.select().from(toursTable).orderBy(toursTable.sortOrder);
  let tours = rows.filter(t => t.published);
  const { category } = req.query as { category?: string };
  if (category) tours = tours.filter(t => t.category === category);
  res.json(tours.map(mapTour));
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(toursTable).where(eq(toursTable.id, parseInt(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapTour(row));
});

router.post("/", async (req, res) => {
  const [row] = await db.insert(toursTable).values(req.body).returning();
  res.status(201).json(mapTour(row));
});

router.patch("/:id", async (req, res) => {
  const [row] = await db.update(toursTable).set(req.body).where(eq(toursTable.id, parseInt(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapTour(row));
});

router.delete("/:id", async (req, res) => {
  await db.delete(toursTable).where(eq(toursTable.id, parseInt(req.params.id)));
  res.status(204).send();
});

export default router;
