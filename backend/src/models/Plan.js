import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Plan = sequelize.define("Plan", {
    userId: {type: DataTypes.STRING, allowNull: true}, // zmienione allowNull z false na true bo w planValidator.js usuniety z walidacji jest userId zeby nie mieczyc sie z tym pozdrawiam
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    goal: DataTypes.STRING,
    days: DataTypes.INTEGER,
    experience: DataTypes.STRING,
    plan: DataTypes.JSON
}, {
    timestamps: true
});

export default Plan;