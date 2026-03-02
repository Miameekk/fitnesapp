import { Sequelize } from "sequelize";

const sequelize = new Sequelize("fitnesapp", "fitapp", "strongpassword", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

export default sequelize;