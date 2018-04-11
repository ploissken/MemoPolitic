'use strict';

module.exports = function(sequelize, DataTypes) {
    var Mission = sequelize.define('Mission', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        missionIsInternational: DataTypes.BOOLEAN,
        missionSummary: DataTypes.STRING,
        missionStart: DataTypes.DATEONLY,
        missionEnd: DataTypes.DATEONLY,
        missionDoc: DataTypes.STRING
    });

    var SenatorMission = sequelize.define('SenatorMission', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        missionId: DataTypes.INTEGER,
        senatorId: DataTypes.INTEGER
    });

    Mission.associate = function(model) {
        model.Mission.belongsToMany(model.Senator, {
            through: {
                model: model.SenatorMission,
                unique: false
            }
        });
    };

    return [Mission, SenatorMission];
};