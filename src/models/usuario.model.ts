import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import UsuarioType from "../types/usuario.types";

export class UsuarioModel extends Model<UsuarioType> {}

UsuarioModel.init(
    {
        idUsuario: {
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
    },
    {
        sequelize,
        tableName: "usuario",
    }
);