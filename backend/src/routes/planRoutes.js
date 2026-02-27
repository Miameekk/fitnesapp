import express from "express";
import { generatePlan, getPlansList, deletePlan } from "../controllers/planController.js";

const router = express.Router();

router.post("/generate-plan", generatePlan);
router.get("/plans/:userId", getPlansList);
router.delete("/plans/:id", deletePlan);

export default router;