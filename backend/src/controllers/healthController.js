import { randomUUID } from "crypto";
import { validateHealthData } from "../validators/healthValidator.js";
import { generateMealPlan } from "../services/ollamaService.js";
import MealPlan from "../models/MealPlan.js";

export async function submitHealthData(req, res) {
  try {
    const error = validateHealthData(req.body);
    if (error) {
      return res.status(400).json({ success: false, error });
    }

    const userId = req.body.userId || randomUUID();
    const sessionId = randomUUID();

    // Generate meal plan using AI
    const rawMealPlan = await generateMealPlan(req.body);

    // Parse the response
    let parsedMealPlan;
    try {
      parsedMealPlan = typeof rawMealPlan === "string" ? JSON.parse(rawMealPlan) : rawMealPlan;
    } catch (e) {
      parsedMealPlan = rawMealPlan;
    }

    // Set expiration time for meal plan (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Store meal plan temporarily
    const mealPlanRecord = await MealPlan.create({
      sessionId,
      userId,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      gender: req.body.gender,
      caloricDeficit: req.body.caloricDeficit,
      goal: req.body.goal,
      healthIssues: req.body.healthIssues,
      additionalNotes: req.body.additionalNotes,
      mealPlan: parsedMealPlan,
      expiresAt
    });

    res.json({
      success: true,
      sessionId,
      mealPlanId: mealPlanRecord.id,
      mealPlan: parsedMealPlan,
      message: "Plan posiłków został wygenerowany i zapisany. Możesz teraz wygenerować plan treningowy."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Błąd generowania planu posiłków"
    });
  }
}