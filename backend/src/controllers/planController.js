import { validatePlanData } from "../validators/planValidator.js";
import { generateTrainingPlan } from "../services/ollamaService.js";
import Plan from "../models/Plan.js";

export async function generatePlan(req, res) {
  try {
    const error = validatePlanData(req.body);
    if (error) {
      return res.status(400).json({ success: false, error });
    }

    if (!req.body.userId) {
      return res.status(400).json({ success: false, error: "Brak pola: userId" });
    }

    const raw = await generateTrainingPlan(req.body);

    // spróbuj sparsować odpowiedź AI; jeśli nie jest JSON, zapisz surowy tekst
    let parsedPlan;
    try {
      parsedPlan = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      parsedPlan = raw;
    }

    const newPlan = await Plan.create({
      userId: req.body.userId,
      age: req.body.age,
      weight: req.body.weight,
      goal: req.body.goal,
      days: req.body.days,
      experience: req.body.experience,
      plan: parsedPlan
    });

    res.json({
      success: true,
      plan: parsedPlan,
      id: newPlan.id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Błąd generowania planu"
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