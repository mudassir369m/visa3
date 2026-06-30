import { Router } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";

const router = Router();

router.post("/", async (req, res) => {
  try {
    await db.insert(newsletterSubscribersTable).values(req.body).onConflictDoNothing();
    res.status(201).json({ ok: true });
  } catch {
    res.status(200).json({ ok: true });
  }
});

export default router;
