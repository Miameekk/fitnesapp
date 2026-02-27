import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Plan = sequelize.define("Plan", {
    userId: {type: DataTypes.STRING, allowNull: false},
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