import {DataTypes} from "sequelize";
import {SCHEMA} from "./Z_CONST.js";

export const createFileTabModel = async (sequelize) => {
    const FileTab = sequelize.define(
        "fileTab",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            hide: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            key: {
                type: DataTypes.STRING,
            },
            label: {
                type: DataTypes.TEXT,
            },
            alt: {
                type: DataTypes.STRING,
            },
            position: {
                type: DataTypes.INTEGER,
            },
            table: {
                type: DataTypes.STRING,
            },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            schema: SCHEMA,
            tableName: "fileTab",
            timestamps: false,
            hooks: {
                beforeCreate: (fileTab) => {
                    if (!fileTab.alt) {
                        fileTab.alt = fileTab.label;
                    }
                },
                afterCreate: async (fileTab) => {
                    if (!fileTab.key) {
                        fileTab.key = `${fileTab.label}-${fileTab.id}`;
                        await fileTab.save();
                    }
                },
            },
        }
    );

    return FileTab;
};
