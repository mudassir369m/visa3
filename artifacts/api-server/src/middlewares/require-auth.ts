import type { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return void res.status(401).json({ error: "Authentication required" });
  }
  next();
};
