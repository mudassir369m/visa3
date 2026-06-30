import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const visasTable = pgTable("visas", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  slug: text("slug").notNull().unique(),
  flag: text("flag").notNull(),
  headline: text("headline").notNull(),
  description: text("description"),
  visaTypes: text("visa_types").array().notNull().default([]),
  processingDays: text("processing_days").notNull(),
  successRate: text("success_rate").notNull(),
  requirements: text("requirements").array().notNull().default([]),
  documents: text("documents").array().notNull().default([]),
  fees: text("fees"),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVisaSchema = createInsertSchema(visasTable).omit({ id: true, createdAt: true });
export type InsertVisa = z.infer<typeof insertVisaSchema>;
export type Visa = typeof visasTable.$inferSelect;
