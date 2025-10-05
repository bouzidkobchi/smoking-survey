import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { randomUUID } from "crypto";
import { type Survey, type InsertSurvey } from "@shared/schema";

export interface IStorage {
  createSurvey(survey: InsertSurvey): Promise<Survey>;
  getAllSurveys(): Promise<Survey[]>;
  getSurveyById(id: string): Promise<Survey | undefined>;
}

export class SQLiteStorage implements IStorage {
  private db: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(dbPath = "./surveys.db") {
    this.db = null as any;
    this.init(dbPath);
  }

  private async init(dbPath: string) {
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS surveys (
        id TEXT PRIMARY KEY,
        gender TEXT NOT NULL,
        age INTEGER NOT NULL,
        maritalStatus TEXT NOT NULL,
        educationLevel TEXT NOT NULL,
        occupation TEXT NOT NULL,
        residence TEXT NOT NULL,
        currentlySmoking BOOLEAN NOT NULL,
        ageStartedSmoking INTEGER,
        tobaccoType TEXT,
        cigarettesPerDay TEXT,
        smokingFrequency TEXT,
        firstCigaretteTiming TEXT,
        smokesIndoors BOOLEAN,
        quitAttempts TEXT,
        longestQuitPeriod TEXT,
        reasonStarted TEXT,
        reasonStartedOther TEXT,
        considersAddicted BOOLEAN,
        awarenessOfDiseases BOOLEAN NOT NULL,
        diseasesKnown TEXT,
        diseasesKnownOther TEXT,
        informationSource TEXT NOT NULL,
        chronicCough BOOLEAN NOT NULL,
        breathingIssues BOOLEAN NOT NULL,
        doctorVisit BOOLEAN NOT NULL,
        familyHistory BOOLEAN NOT NULL,
        consideringQuitting TEXT,
        quitBarrier TEXT,
        quitBarrierOther TEXT,
        preferredQuitMethod TEXT,
        interestedInProgram BOOLEAN,
        timeSinceQuit TEXT,
        quitReason TEXT,
        quitReasonOther TEXT,
        quitDifficulty TEXT,
        experiencedRelapse BOOLEAN,
        adviceForSmokers TEXT,
        opinionOnCampaigns TEXT,
        suggestionsForHelp TEXT,
        createdAt TEXT NOT NULL
      );
    `);
  }

  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    const survey: Survey = {
      id,
      createdAt: new Date(createdAt),
      ...insertSurvey,

      // Normalize undefined -> null for optional fields
      ageStartedSmoking: insertSurvey.ageStartedSmoking ?? null,
      tobaccoType: insertSurvey.tobaccoType ?? null,
      cigarettesPerDay: insertSurvey.cigarettesPerDay ?? null,
      smokingFrequency: insertSurvey.smokingFrequency ?? null,
      firstCigaretteTiming: insertSurvey.firstCigaretteTiming ?? null,
      smokesIndoors: insertSurvey.smokesIndoors ?? null,
      quitAttempts: insertSurvey.quitAttempts ?? null,
      longestQuitPeriod: insertSurvey.longestQuitPeriod ?? null,
      reasonStarted: insertSurvey.reasonStarted ?? null,
      reasonStartedOther: insertSurvey.reasonStartedOther ?? null,
      considersAddicted: insertSurvey.considersAddicted ?? null,
      diseasesKnown: Array.isArray(insertSurvey.diseasesKnown)
        ? insertSurvey.diseasesKnown
        : [],
      diseasesKnownOther: insertSurvey.diseasesKnownOther ?? null,
      consideringQuitting: insertSurvey.consideringQuitting ?? null,
      quitBarrier: insertSurvey.quitBarrier ?? null,
      quitBarrierOther: insertSurvey.quitBarrierOther ?? null,
      preferredQuitMethod: insertSurvey.preferredQuitMethod ?? null,
      interestedInProgram: insertSurvey.interestedInProgram ?? null,
      timeSinceQuit: insertSurvey.timeSinceQuit ?? null,
      quitReason: insertSurvey.quitReason ?? null,
      quitReasonOther: insertSurvey.quitReasonOther ?? null,
      quitDifficulty: insertSurvey.quitDifficulty ?? null,
      experiencedRelapse: insertSurvey.experiencedRelapse ?? null,
      adviceForSmokers: insertSurvey.adviceForSmokers ?? null,
      opinionOnCampaigns: insertSurvey.opinionOnCampaigns ?? null,
      suggestionsForHelp: insertSurvey.suggestionsForHelp ?? null,
    };


    const columns = Object.keys(survey);
    const placeholders = columns.map(() => "?").join(", ");
    const values = Object.values(survey).map(v =>
      v instanceof Date
        ? v.toISOString()
        : Array.isArray(v)
          ? JSON.stringify(v)
          : v
    );

    await this.db.run(
      `INSERT INTO surveys (${columns.join(", ")}) VALUES (${placeholders})`,
      values
    );

    return survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    const rows = await this.db.all<Survey[]>(
      "SELECT * FROM surveys ORDER BY datetime(createdAt) DESC"
    );
    return rows.map((r: any) => ({
      ...r,
      createdAt: new Date(r.createdAt),
      diseasesKnown: r.diseasesKnown ? JSON.parse(r.diseasesKnown) : [],
    }));
  }

  async getSurveyById(id: string): Promise<Survey | undefined> {
    const row = await this.db.get<Survey>(
      "SELECT * FROM surveys WHERE id = ?",
      [id]
    );
    return row
      ? {
        ...row,
        createdAt: new Date(row.createdAt),
        diseasesKnown: typeof row.diseasesKnown === "string"
          ? JSON.parse(row.diseasesKnown)
          : Array.isArray(row.diseasesKnown)
            ? row.diseasesKnown
            : [],
      }
      : undefined;
  }
}

export const storage = new SQLiteStorage();