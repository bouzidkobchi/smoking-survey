import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const surveys = pgTable("surveys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Demographics
  gender: text("gender").notNull(),
  age: integer("age").notNull(),
  maritalStatus: text("marital_status").notNull(),
  educationLevel: text("education_level").notNull(),
  occupation: text("occupation").notNull(),
  residence: text("residence").notNull(),
  
  // Smoking Status
  currentlySmoking: boolean("currently_smoking").notNull(),
  
  // For current smokers
  ageStartedSmoking: integer("age_started_smoking"),
  tobaccoType: text("tobacco_type"),
  cigarettesPerDay: text("cigarettes_per_day"),
  smokingFrequency: text("smoking_frequency"),
  firstCigaretteTiming: text("first_cigarette_timing"),
  smokesIndoors: boolean("smokes_indoors"),
  quitAttempts: text("quit_attempts"),
  longestQuitPeriod: text("longest_quit_period"),
  reasonStarted: text("reason_started"),
  reasonStartedOther: text("reason_started_other"),
  considersAddicted: boolean("considers_addicted"),
  
  // Health Awareness
  awarenessOfDiseases: boolean("awareness_of_diseases").notNull(),
  diseasesKnown: text("diseases_known").array(),
  diseasesKnownOther: text("diseases_known_other"),
  informationSource: text("information_source").notNull(),
  
  // Health Impact
  chronicCough: boolean("chronic_cough").notNull(),
  breathingIssues: boolean("breathing_issues").notNull(),
  doctorVisit: boolean("doctor_visit").notNull(),
  familyHistory: boolean("family_history").notNull(),
  
  // Quit Intentions (for current smokers)
  consideringQuitting: text("considering_quitting"),
  quitBarrier: text("quit_barrier"),
  quitBarrierOther: text("quit_barrier_other"),
  preferredQuitMethod: text("preferred_quit_method"),
  interestedInProgram: boolean("interested_in_program"),
  
  // For ex-smokers
  timeSinceQuit: text("time_since_quit"),
  quitReason: text("quit_reason"),
  quitReasonOther: text("quit_reason_other"),
  quitDifficulty: text("quit_difficulty"),
  experiencedRelapse: boolean("experienced_relapse"),
  adviceForSmokers: text("advice_for_smokers"),
  
  // Open-ended responses
  opinionOnCampaigns: text("opinion_on_campaigns"),
  suggestionsForHelp: text("suggestions_for_help"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSurveySchema = createInsertSchema(surveys).omit({
  id: true,
  createdAt: true,
});

export type InsertSurvey = z.infer<typeof insertSurveySchema>;
export type Survey = typeof surveys.$inferSelect;
