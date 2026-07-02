import { Router } from "express";
import { db, eligibilitySubmissionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";
import { notifyAdmin } from "../lib/email";

const router = Router();

function scoreEligibility(data: Record<string, unknown>): { score: number; band: string; recommendations: string[] } {
  let score = 40; // base
  const recs: string[] = [];

  if (data.employmentStatus === "employed") score += 15;
  else if (data.employmentStatus === "self-employed") score += 10;
  else if (data.employmentStatus === "retired") score += 8;
  else { score -= 5; recs.push("Stable employment strengthens your application significantly."); }

  if (data.bankBalance === "above-5-lakh") score += 20;
  else if (data.bankBalance === "3-5-lakh") score += 15;
  else if (data.bankBalance === "1-3-lakh") score += 8;
  else { score -= 5; recs.push("Maintain at least 6 months of consistent bank statements."); }

  if (data.propertyOwnership === true) score += 10;
  else recs.push("Property documents strengthen ties to home country.");

  if (Array.isArray(data.previousTravel) && (data.previousTravel as string[]).length > 0) score += 10;
  else recs.push("Prior international travel history improves your profile.");

  if (data.previousRefusals === true) { score -= 20; recs.push("Previous refusals require detailed explanation letters."); }

  const finalScore = Math.min(100, Math.max(0, score));
  const band = finalScore >= 70 ? "green" : finalScore >= 45 ? "yellow" : "red";
  if (band === "green") recs.unshift("Strong profile! Schedule a consultation to begin your application.");
  else if (band === "yellow") recs.unshift("Good potential. Our consultants can strengthen your application.");
  else recs.unshift("Your profile needs strengthening. Book a free consultation for personalized guidance.");

  return { score: finalScore, band, recommendations: recs };
}

function mapSubmission(s: typeof eligibilitySubmissionsTable.$inferSelect) {
  return {
    id: s.id,
    destinationCountry: s.destinationCountry,
    visaPurpose: s.visaPurpose,
    ageRange: s.ageRange ?? null,
    maritalStatus: s.maritalStatus ?? null,
    employmentStatus: s.employmentStatus ?? null,
    monthlyIncome: s.monthlyIncome ?? null,
    bankBalance: s.bankBalance ?? null,
    propertyOwnership: s.propertyOwnership ?? null,
    previousTravel: s.previousTravel,
    previousRefusals: s.previousRefusals ?? null,
    refusalCountries: s.refusalCountries,
    name: s.name,
    phone: s.phone,
    email: s.email,
    score: s.score,
    band: s.band,
    status: s.status,
    notes: s.notes ?? null,
    createdAt: s.createdAt.toISOString(),
  };
}

// POST /api/eligibility
router.post("/", async (req, res) => {
  const { score, band, recommendations } = scoreEligibility(req.body);
  const [row] = await db.insert(eligibilitySubmissionsTable).values({
    ...req.body,
    score,
    band,
    status: "new",
  }).returning();
  res.status(201).json({ id: row.id, score, band, recommendations });
  void notifyAdmin(
    `New eligibility check: ${row.name} (${row.score}%, ${row.band})`,
    `<p><strong>${row.name}</strong> (${row.phone}, ${row.email}) completed an eligibility check for <strong>${row.destinationCountry.toUpperCase()}</strong>.</p>
     <p><strong>Score:</strong> ${row.score}% (${row.band})</p>
     <p><strong>Purpose:</strong> ${row.visaPurpose}</p>`
  );
});

// GET /api/eligibility
router.get("/", requireAuth, async (_req, res) => {
  const rows = await db.select().from(eligibilitySubmissionsTable).orderBy(eligibilitySubmissionsTable.createdAt);
  res.json(rows.map(mapSubmission));
});

// GET /api/eligibility/:id
router.get("/:id", requireAuth, async (req, res) => {
  const [row] = await db.select().from(eligibilitySubmissionsTable).where(eq(eligibilitySubmissionsTable.id, parseInt(req.params.id as string)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapSubmission(row));
});

// PATCH /api/eligibility/:id
router.patch("/:id", requireAuth, async (req, res) => {
  const [row] = await db.update(eligibilitySubmissionsTable).set(req.body).where(eq(eligibilitySubmissionsTable.id, parseInt(req.params.id as string))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(mapSubmission(row));
});

export default router;
