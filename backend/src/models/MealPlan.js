import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const MealPlan = sequelize.define("MealPlan", {
    sessionId: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    height: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    caloricDeficit: { type: DataTypes.INTEGER, allowNull: false },
    goal: { type: DataTypes.STRING, allowNull: false },
    healthIssues: { type: DataTypes.TEXT, allowNull: true },
    additionalNotes: { type: DataTypes.TEXT, allowNull: true },
    mealPlan: { type: DataTypes.JSON, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: true
});

export default MealPlan;