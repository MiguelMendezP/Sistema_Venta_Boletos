import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import UsuarioType from "../types/usuario.types";

export class UsuarioModel extends Model<UsuarioType> {}

UsuarioModel.init(
    {
        correo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "usuario",
    }
);