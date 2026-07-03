import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const successStoriesTable = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  person: text("person").notNull(),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  videoUrl: text("video_url"),
  thumbnail: text("thumbnail"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSuccessStorySchema = createInsertSchema(successStoriesTable).omit({ id: true, createdAt: true });
export type InsertSuccessStory = z.infer<typeof insertSuccessStorySchema>;
export type SuccessStory = typeof successStoriesTable.$inferSelect;
