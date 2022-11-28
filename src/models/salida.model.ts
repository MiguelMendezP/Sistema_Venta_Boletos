import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import SalidaType from "../types/salida.types";

export class SalidaModel extends Model<SalidaType> {}

SalidaModel.init(
    {
        idSalida: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        hora: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        terminal_salida: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        terminal_destino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "salida",
    }
);