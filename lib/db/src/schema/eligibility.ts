import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eligibilitySubmissionsTable = pgTable("eligibility_submissions", {
  id: serial("id").primaryKey(),
  destinationCountry: text("destination_country").notNull(),
  visaPurpose: text("visa_purpose").notNull(),
  ageRange: text("age_range"),
  maritalStatus: text("marital_status"),
  employmentStatus: text("employment_status"),
  monthlyIncome: text("monthly_income"),
  bankBalance: text("bank_balance"),
  propertyOwnership: boolean("property_ownership"),
  previousTravel: text("previous_travel").array().notNull().default([]),
  previousRefusals: boolean("previous_refusals"),
  refusalCountries: text("refusal_countries").array().notNull().default([]),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  score: integer("score").notNull().default(0),
  band: text("band").notNull().default("yellow"),
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEligibilitySchema = createInsertSchema(eligibilitySubmissionsTable).omit({ id: true, createdAt: true });
export type InsertEligibility = z.infer<typeof insertEligibilitySchema>;
export type EligibilitySubmission = typeof eligibilitySubmissionsTable.$inferSelect;
