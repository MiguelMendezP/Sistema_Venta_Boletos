import { Sequelize } from "sequelize";

const DB_USER = "postgres";
const DB_PASSWORD = "12345";
const DB_NAME = "Boletos";
const DB_HOST = "localhost";
const DB_DIALECT = "postgres";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  
});
