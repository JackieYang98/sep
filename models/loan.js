'use strict';

module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_started: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        application_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        /** No createdAt, updatedAT */
        timestamps: false,
    });

    /** Association */
    Loan.associate = function(models) {
        models.Loan.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        });

        models.Loan.belongsTo(models.Application, {
            foreignKey: {
                name: 'application_id',
                allowNull: false
            }
        })
    };

    return Loan;
};