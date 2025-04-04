import {
    DataTypes
} from "sequelize";
import {
    SCHEMA
} from './Z_CONST.js';

export const createCanvasDataModel = async (sequelize) => {
    const CanvasData = sequelize.define(
        "canvas_data", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            code: {
                type: DataTypes.STRING,
            },
            departments: {
                type: DataTypes.JSONB,
            },
            description: {
                type: DataTypes.TEXT,
            },
            aiDatapackId: {
                type: DataTypes.INTEGER,
            },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            }
        }, {
            schema: SCHEMA,
            tableName: "canvas_data",
            timestamps: false,
        }
    );
    return CanvasData;
};