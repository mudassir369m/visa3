import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminUsersTable, leadsTable, eligibilitySubmissionsTable, heroSlidesTable } from "@workspace/db";
import { eq, gte, and, sql } from "drizzle-orm";

const router = Router();

function mapUser(u: typeof adminUsersTable.$inferSelect) {
  return { id: u.id, email: u.email, name: u.name, createdAt: u.createdAt.toISOString() };
}
function mapHero(h: typeof heroSlidesTable.$inferSelect) {
  return {
    id: h.id,
    headline: h.headline,
    subhead: h.subhead,
    primaryCta: h.primaryCta,
    primaryCtaLink: h.primaryCtaLink,
    secondaryCta: h.secondaryCta ?? null,
    secondaryCtaLink: h.secondaryCtaLink ?? null,
    mediaUrl: h.mediaUrl ?? null,
    mediaType: h.mediaType ?? null,
    overlayOpacity: h.overlayOpacity,
    active: h.active,
    sortOrder: h.sortOrder,
  };
}

// GET /api/admin/dashboard
router.get("/dashboard", async (_req, res) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const allLeads = await db.select().from(leadsTable).orderBy(leadsTable.createdAt);
  const leadsToday = allLeads.filter(l => l.createdAt >= todayStart).length;
  const leadsThisMonth = allLeads.filter(l => l.createdAt >= monthStart).length;
  const totalEligibility = await db.select({ count: sql<number>`count(*)` }).from(eligibilitySubmissionsTable);

  // Leads by day for last 30 days
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recentAll = allLeads.filter(l => l.createdAt >= thirtyDaysAgo);
  const dayMap: Record<string, number> = {};
  for (const lead of recentAll) {
    const d = lead.createdAt.toISOString().slice(0, 10);
    dayMap[d] = (dayMap[d] || 0) + 1;
  }
  const leadsByDay = Object.entries(dayMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  const recentLeads = allLeads.slice(-10).reverse().map(l => ({
    id: l.id, name: l.name, phone: l.phone, email: l.email,
    subject: l.subject, message: l.message,
    source: l.source ?? null, visaCountry: l.visaCountry ?? null,
    status: l.status, notes: l.notes ?? null, createdAt: l.createdAt.toISOString(),
  }));

  res.json({
    leadsToday,
    leadsThisMonth,
    totalLeads: allLeads.length,
    totalEligibility: Number(totalEligibility[0]?.count ?? 0),
    recentLeads,
    leadsByDay,
  });
});

// GET /api/admin/users
router.get("/users", async (_req, res) => {
  const rows = await db.select().from(adminUsersTable);
  res.json(rows.map(mapUser));
});

// POST /api/admin/users
router.post("/users", async (req, res) => {
  const { email, name, password } = req.body as { email: string; name: string; password: string };
  const passwordHash = await bcrypt.hash(password, 10);
  const [row] = await db.insert(adminUsersTable).values({ email, name, passwordHash }).returning();
  res.status(201).json(mapUser(row));
});

// GET /api/admin/hero
router.get("/hero", async (_req, res) => {
  const rows = await db.select().from(heroSlidesTable).orderBy(heroSlidesTable.sortOrder);
  res.json(rows.map(mapHero));
});

// POST /api/admin/hero
router.post("/hero", async (req, res) => {
  const [row] = await db.insert(heroSlidesTable).values(req.body).returning();
  res.status(201).json(mapHero(row));
});

// PATCH /api/admin/hero/:id
router.patch("/hero/:id", async (req, res) => {
  const [row] = await db.update(heroSlidesTable).set(req.body).where(eq(heroSlidesTable.id, parseInt(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapHero(row));
});

// DELETE /api/admin/hero/:id
router.delete("/hero/:id", async (req, res) => {
  await db.delete(heroSlidesTable).where(eq(heroSlidesTable.id, parseInt(req.params.id)));
  res.status(204).send();
});

export default router;
