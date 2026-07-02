import { Router } from "express";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

const DEFAULTS: Record<string, unknown> = {
  businessName: "New Euro Consultants",
  tagline: "A Step Before Embassy",
  phone: "+92 314 535 2222",
  whatsapp: "923145352222",
  email: "info@neweuroconsultants.com",
  address: "Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad, Pakistan",
  hours: "Mon–Fri 9:00 AM – 4:00 PM (Sat & Sun closed)",
  instagramHandle: "neweuroconsultants",
  instagramHandle2: "worldofmustafa1",
  tiktokHandle: "worldofmustafa",
  facebookHandle: "worldofmustafa",
  youtubeHandle: "neweuroconsultants",
  announcementBar: "🛂 Free Eligibility Check · ☎️ +92 314 535 2222 · 📍 F-11 Markaz Islamabad · ⭐ 18 Years of Excellence",
  visasProcessed: "5000",
  yearsExperience: "18",
  successRate: "99%",
  countriesCovered: "50",
};

async function getSettings() {
  const rows = await db.select().from(siteSettingsTable);
  const map: Record<string, string> = {};
  for (const row of rows) map[row.key] = row.value;
  const merged: Record<string, unknown> = { ...DEFAULTS };
  for (const [k, v] of Object.entries(map)) merged[k] = v;
  return {
    businessName: merged.businessName as string,
    tagline: merged.tagline as string,
    phone: merged.phone as string,
    whatsapp: merged.whatsapp as string,
    email: merged.email as string,
    address: merged.address as string,
    hours: merged.hours as string,
    instagramHandle: merged.instagramHandle as string,
    instagramHandle2: merged.instagramHandle2 as string,
    tiktokHandle: merged.tiktokHandle as string,
    facebookHandle: merged.facebookHandle as string,
    youtubeHandle: merged.youtubeHandle as string,
    announcementBar: merged.announcementBar as string,
    visasProcessed: parseInt(merged.visasProcessed as string) || 5000,
    yearsExperience: parseInt(merged.yearsExperience as string) || 18,
    successRate: merged.successRate as string,
    countriesCovered: parseInt(merged.countriesCovered as string) || 50,
  };
}

router.get("/", async (_req, res) => {
  res.json(await getSettings());
});

router.patch("/", requireAuth, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  for (const [key, val] of Object.entries(body)) {
    const value = String(val);
    await db.insert(siteSettingsTable)
      .values({ key, value })
      .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value, updatedAt: new Date() } });
  }
  res.json(await getSettings());
});

export default router;
