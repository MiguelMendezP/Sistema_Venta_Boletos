import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import AdministradorType from "../types/administrador.types";

export class AdministradorModel extends Model<AdministradorType> {}

AdministradorModel.init(
    {
        idAdministrador:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        administrador:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "administrador",
    }
);