import { Router } from "express";
import { db } from "@workspace/db";
import { teamMembersTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

function mapMember(t: typeof teamMembersTable.$inferSelect) {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    bio: t.bio ?? null,
    photoUrl: t.photoUrl ?? null,
    sortOrder: t.sortOrder,
    isPublished: t.isPublished,
    createdAt: t.createdAt.toISOString(),
  };
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(teamMembersTable)
    .where(eq(teamMembersTable.isPublished, true))
    .orderBy(asc(teamMembersTable.sortOrder));
  res.json(rows.map(mapMember));
});

router.post("/", requireAuth, async (req, res) => {
  const [row] = await db.insert(teamMembersTable).values(req.body).returning();
  res.status(201).json(mapMember(row));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(teamMembersTable).set(req.body)
    .where(eq(teamMembersTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapMember(row));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.delete(teamMembersTable).where(eq(teamMembersTable.id, parseInt(req.params.id as string)));
  res.status(204).send();
});

export default router;
