import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.config";
import PasajeroType from "../types/pasajero.types";

export class PasajeroModel extends Model<PasajeroType> {}

PasajeroModel.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "pasajero",
    }
);