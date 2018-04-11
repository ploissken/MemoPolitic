'use strict';

module.exports = function(sequelize, DataTypes) {
    var { Senator } = require('.');
    var Comission = sequelize.define('Comission', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        commisionName: DataTypes.STRING,
        comissionLink: DataTypes.STRING,
        comissionFfunction: DataTypes.STRING,
        comissionStart: DataTypes.DATEONLY,
        comissionEnd: DataTypes.DATEONLY
    });

    var SenatorComissions = sequelize.define('SenatorComissions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comissionId: DataTypes.INTEGER,
        senatorId: DataTypes.INTEGER
    });

    Comission.associate = function(model) {
        model.Comission.belongsToMany(model.Senator, {
            through: {
                model: model.SenatorComissions,
                unique: false
            }
        });
    };

    return [Comission, SenatorComissions];
};