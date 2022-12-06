import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import BoletoType from "../types/boleto.types";

export class BoletoModel extends Model<BoletoType> {}

BoletoModel.init(
    {
        idBoleto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idSalida: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        noAsiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "boleto",
    }
);