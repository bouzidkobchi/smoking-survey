import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { type Survey, type InsertSurvey, surveys } from "@shared/schema";

export interface IStorage {
  createSurvey(survey: InsertSurvey): Promise<Survey>;
  getAllSurveys(): Promise<Survey[]>;
  getSurveyById(id: string): Promise<Survey | undefined>;
}

export class PostgresStorage implements IStorage {
  private db: PostgresJsDatabase;

  constructor(connectionString: string) {
    const client = postgres(connectionString);
    this.db = drizzle(client);
    
    // Note: In production, you should use migrations instead of syncing
    // this.initSchema();
  }

  // Optional: Initialize schema (use migrations in production)
  // private async initSchema() {
  //   // You would use migrations instead in a real application
  //   // This is just for development/demo purposes
  // }

  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const surveyData = {
      ...insertSurvey,
      // Handle array fields - ensure diseasesKnown is properly formatted
      diseasesKnown: Array.isArray(insertSurvey.diseasesKnown) 
        ? insertSurvey.diseasesKnown 
        : [],
    };

    const [survey] = await this.db
      .insert(surveys)
      .values(surveyData)
      .returning();

    return survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    const allSurveys = await this.db
      .select()
      .from(surveys)
      .orderBy(desc(surveys.createdAt));

    return allSurveys;
  }

  async getSurveyById(id: string): Promise<Survey | undefined> {
    const [survey] = await this.db
      .select()
      .from(surveys)
      .where(eq(surveys.id, id))
      .limit(1);

    return survey || undefined;
  }
}

// You'll need to provide your PostgreSQL connection string
// Example: "postgres://username:password@localhost:5432/database_name"
export const storage = new PostgresStorage(process.env.DATABASE_URL || "postgresql://survey_b3fd_user:KqtqJfHUfPvTMUPZIKvNDGobCaDetodC@dpg-d3mlo2uuk2gs73ek32ug-a.oregon-postgres.render.com/survey_b3fd?ssl=true");