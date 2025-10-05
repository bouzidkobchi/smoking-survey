import { type Survey, type InsertSurvey } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSurvey(survey: InsertSurvey): Promise<Survey>;
  getAllSurveys(): Promise<Survey[]>;
  getSurveyById(id: string): Promise<Survey | undefined>;
}

export class MemStorage implements IStorage {
  private surveys: Map<string, Survey>;

  constructor() {
    this.surveys = new Map();
  }

  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const id = randomUUID();
    const survey: Survey = {
      ...insertSurvey,
      id,
      createdAt: new Date(),
    };
    this.surveys.set(id, survey);
    return survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getSurveyById(id: string): Promise<Survey | undefined> {
    return this.surveys.get(id);
  }
}

export const storage = new MemStorage();
