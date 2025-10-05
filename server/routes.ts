import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit a new survey
  app.post("/api/surveys", async (req, res) => {
    try {
      const validatedData = insertSurveySchema.parse(req.body);
      const survey = await storage.createSurvey(validatedData);
      res.status(201).json(survey);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all surveys (for admin)
  app.get("/api/surveys", async (req, res) => {
    try {
      const surveys = await storage.getAllSurveys();
      res.json(surveys);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a specific survey by ID
  app.get("/api/surveys/:id", async (req, res) => {
    try {
      const survey = await storage.getSurveyById(req.params.id);
      if (!survey) {
        res.status(404).json({ error: "Survey not found" });
        return;
      }
      res.json(survey);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
