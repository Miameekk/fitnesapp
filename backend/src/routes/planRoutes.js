import express from "express";
import { generatePlan, getPlansList, deletePlan } from "../controllers/planController.js";
import { submitHealthData } from "../controllers/healthController.js";

const router = express.Router();

// do wyslania mi danych i generuje plan jedzienowy
router.post("/submit-health-data", submitHealthData);

// generuje plan trenigowy na podstawie jedzieniowego (MUSI BYC WCZESNIEJ JEDZENIOWY WYGENEROWANY!!)
router.post("/generate-plan", generatePlan);

// Existing CRUD operations
router.get("/plans/:userId", getPlansList);
router.delete("/plans/:id", deletePlan);

export default router;