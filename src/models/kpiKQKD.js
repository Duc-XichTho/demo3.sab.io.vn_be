import {DataTypes} from "sequelize";
import {config} from "dotenv";

config();

export const createKpiKQKDModel = async (sequelize) => {
    const KpiKQKD = sequelize.define(
        "kpiKQKD",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            isSelected: {
                type: DataTypes.BOOLEAN,
            },
            benmarks: {
                type: DataTypes.JSONB,
            },
            name: {
                type: DataTypes.STRING,
            },
            id_khkd_tong_hop: {
                type: DataTypes.INTEGER,
            },
            setting: {
                type: DataTypes.JSONB,
            },
            created_at: {
                type: DataTypes.STRING,
            },
            updated_at: {
                type: DataTypes.STRING,
            },
            deleted_at: {
                type: DataTypes.STRING,
            },
            user_create: {
                type: DataTypes.STRING,
            },
            user_update: {
                type: DataTypes.STRING,
            },
            user_delete: {
                type: DataTypes.STRING,
            },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "kpiKQKD",
            schema: process.env.SCHEMA,
        }
    );
    return KpiKQKD;
};
