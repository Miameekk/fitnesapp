import { randomUUID } from "crypto";
import { validatePlanData } from "../validators/planValidator.js";
import { generateTrainingPlan } from "../services/ollamaService.js";
import Plan from "../models/Plan.js";
import MealPlan from "../models/MealPlan.js";
import { Op } from "sequelize";

export async function generatePlan(req, res) {
  try {
    // Zgodnie z założeniem, że zawsze używamy ostatniego planu,
    // z ciała zapytania potrzebujemy tylko opcjonalnych wykluczonych ćwiczeń.
    const { excludedExercises } = req.body;

    // Wyszukujemy najnowszy, niewygasły plan posiłków w bazie danych.
    const mealPlanRecord = await MealPlan.findOne({
      where: { expiresAt: { [Op.gt]: new Date() } }, // Upewniamy się, że nie wygasł
      order: [ [ 'createdAt', 'DESC' ] ] // Sortujemy po dacie utworzenia malejąco i bierzemy pierwszy
    });

    if (!mealPlanRecord) {
      return res.status(404).json({
        success: false,
        error: "Nie znaleziono aktywnego planu posiłków. Wygeneruj najpierw plan posiłków."
      });
    }

    // Prepare data for AI - combine meal plan with health data
    const healthData = {
      age: mealPlanRecord.age,
      weight: mealPlanRecord.weight,
      height: mealPlanRecord.height,
      gender: mealPlanRecord.gender,
      caloricDeficit: mealPlanRecord.caloricDeficit,
      goal: mealPlanRecord.goal,
      healthIssues: mealPlanRecord.healthIssues,
      additionalNotes: mealPlanRecord.additionalNotes,
      excludedExercises: excludedExercises || 'Brak'
    };

    const raw = await generateTrainingPlan(mealPlanRecord.mealPlan, healthData);

    // Parse the response
    let parsedPlan;
    try {
      parsedPlan = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      parsedPlan = raw;
    }

    // Store final training plan
    const newPlan = await Plan.create({
      userId: mealPlanRecord.userId,
      sessionId: mealPlanRecord.sessionId, // Używamy sessionId z odnalezionego rekordu
      mealPlanId: mealPlanRecord.id,
      age: mealPlanRecord.age,
      weight: mealPlanRecord.weight,
      height: mealPlanRecord.height,
      gender: mealPlanRecord.gender,
      caloricDeficit: mealPlanRecord.caloricDeficit,
      goal: mealPlanRecord.goal,
      healthIssues: mealPlanRecord.healthIssues,
      additionalNotes: mealPlanRecord.additionalNotes,
      excludedExercises: excludedExercises,
      plan: parsedPlan
    });

    // Clean up temporary meal plan after successful training plan creation
    await MealPlan.destroy({ where: { id: mealPlanRecord.id } });

    res.json({
      success: true,
      plan: parsedPlan,
      id: newPlan.id,
      message: "Plan treningowy został wygenerowany i zapisany."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Błąd generowania planu treningowego"
    });
  }
}

export async function getPlansList(req, res) {
  try {
    const plans = await Plan.findAll({
      where: { userId: req.params.userId }
    });
    res.json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function deletePlan(req, res) {
  try {
    await Plan.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: "Plan usunięty" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}