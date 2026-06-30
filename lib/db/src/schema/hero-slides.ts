import { pgTable, serial, text, boolean, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const heroSlidesTable = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  headline: text("headline").notNull(),
  subhead: text("subhead").notNull(),
  primaryCta: text("primary_cta").notNull(),
  primaryCtaLink: text("primary_cta_link").notNull(),
  secondaryCta: text("secondary_cta"),
  secondaryCtaLink: text("secondary_cta_link"),
  mediaUrl: text("media_url"),
  mediaType: text("media_type"),
  overlayOpacity: real("overlay_opacity").notNull().default(0.7),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHeroSlideSchema = createInsertSchema(heroSlidesTable).omit({ id: true, createdAt: true });
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type HeroSlide = typeof heroSlidesTable.$inferSelect;
