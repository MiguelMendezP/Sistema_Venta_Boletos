import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import TerminalType from "../types/terminal.types";

export class TermianlModel extends Model<TerminalType> {}

TermianlModel.init(
    {
        idTerminal: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "terminal",
    }
);