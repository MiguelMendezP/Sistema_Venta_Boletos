import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.config";

export const Usuario = sequelize.define('usuario', {
    usuario:{
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    }
})