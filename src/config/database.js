import { Sequelize } from "sequelize";

const sequelize = new Sequelize("fitnesapp", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

export default sequelize;

//------><------\\
//NA MASZYNIE GDZIE JEST XAMPP JEST TO ZMIENIONE TAM WYGLADA TO TAK :
//const sequelize = new Sequelize("fitnesapp", "root", "", {...
//------><------\\