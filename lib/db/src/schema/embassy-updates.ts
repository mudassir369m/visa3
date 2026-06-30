import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const embassyUpdatesTable = pgTable("embassy_updates", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  flag: text("flag").notNull(),
  headline: text("headline").notNull(),
  summary: text("summary").notNull(),
  content: text("content"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmbassyUpdateSchema = createInsertSchema(embassyUpdatesTable).omit({ id: true, createdAt: true });
export type InsertEmbassyUpdate = z.infer<typeof insertEmbassyUpdateSchema>;
export type EmbassyUpdate = typeof embassyUpdatesTable.$inferSelect;
