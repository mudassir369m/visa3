import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  const [user] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email));
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  req.session.userId = user.id;
  return res.json({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt.toISOString() });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const [user] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, userId));
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  return res.json({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt.toISOString() });
});

export default router;
