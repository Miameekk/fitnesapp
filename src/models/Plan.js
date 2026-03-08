import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Plan = sequelize.define("Plan", {
    userId: {type: DataTypes.STRING, allowNull: false},
    sessionId: {type: DataTypes.STRING, allowNull: false},
    mealPlanId: {type: DataTypes.INTEGER, allowNull: false},
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    height: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    caloricDeficit: DataTypes.INTEGER,
    goal: DataTypes.STRING,
    healthIssues: DataTypes.TEXT,
    additionalNotes: DataTypes.TEXT,
    excludedExercises: DataTypes.TEXT,
    plan: DataTypes.JSON
}, {
    timestamps: true
});

export default Plan;