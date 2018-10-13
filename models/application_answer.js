'use strict';

module.exports = (sequelize, DataTypes) => {
    const Application_Answer = sequelize.define('Application_Answer', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        application_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        latest: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    Application_Answer.associate = function(models) {
        models.Application_Answer.belongsTo(models.Application, {
            foreignKey: {
                name: 'application_id',
                allowNull: false,
            }
        });

        models.Application_Answer.belongsTo(models.Question, {
            foreignKey: {
                name: 'question_id',
                allowNull: false
            }
        })
    };

    return Application_Answer;
};