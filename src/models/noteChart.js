import { SCHEMA } from './Z_CONST.js';
import { DataTypes } from 'sequelize';

export const createNoteChartModel = async (sequelize) => {
    const NoteChart = sequelize.define(
        'notechart',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            chartTitle: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
           content : {
               type: DataTypes.TEXT,
               allowNull: true,
           },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            schema: SCHEMA,
            tableName: 'notechart',
            timestamps: false,
        }
    );

    return NoteChart;
};
