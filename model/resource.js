'use strict';

module.exports = function(sequelize, DataTypes) {
    var { Senator } = require('.');
    var Resource = sequelize.define('Resource', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        year: DataTypes.INTEGER,
        type: DataTypes.STRING,
        description: DataTypes.STRING,
        value: DataTypes.FLOAT,
    });

    var SenatorResources = sequelize.define('SenatorResources', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        projectId: DataTypes.INTEGER,
        senatorId: DataTypes.INTEGER
    });

    Resource.associate = function(model) {
        model.Resource.belongsTo(model.Senator, {as: 'Senator'});
    };

    return [Resource, SenatorResources];
};