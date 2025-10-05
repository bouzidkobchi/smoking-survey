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
      diseasesKnown: insertSurvey.diseasesKnown ?? null,
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
