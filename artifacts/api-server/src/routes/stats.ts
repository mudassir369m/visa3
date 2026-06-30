import { Router } from "express";
import { db, siteSettingsTable, leadsTable, eligibilitySubmissionsTable } from "@workspace/db";

const router = Router();

router.get("/", async (_req, res) => {
  const rows = await db.select().from(siteSettingsTable);
  const map: Record<string, string> = {};
  for (const row of rows) map[row.key] = row.value;
  res.json({
    yearsExperience: parseInt(map.yearsExperience || "18"),
    visasProcessed: parseInt(map.visasProcessed || "5000"),
    successRate: map.successRate || "99%",
    countriesCovered: parseInt(map.countriesCovered || "50"),
  });
});

export default router;
