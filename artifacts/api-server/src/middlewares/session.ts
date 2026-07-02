import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "@workspace/db";

const PgSession = connectPgSimple(session);

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set. Did you forget to configure it?");
}

// createTableIfMissing is intentionally disabled: connect-pg-simple resolves its
// table.sql asset relative to its own package directory, which breaks once the
// server is esbuild-bundled into a single file. The "session" table is created
// ahead of time by scripts/src/init-session-table.ts instead.
export const sessionMiddleware = session({
  store: new PgSession({ pool, tableName: "session", createTableIfMissing: false }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
