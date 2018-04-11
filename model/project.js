'use strict';

module.exports = function(sequelize, DataTypes) {
    var { Senator } = require('.');
    var Project = sequelize.define('Project', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        projectDescription: DataTypes.STRING,
        projectLink: DataTypes.STRING,
        projectDate: DataTypes.DATEONLY,
        projectAuthors: DataTypes.STRING,

    });

    var SenatorProjects = sequelize.define('SenatorProjects', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        projectId: DataTypes.INTEGER,
        senatorId: DataTypes.INTEGER
    });

    Project.associate = function(model) {
        model.Project.belongsToMany(model.Senator, {
            through: {
                model: model.SenatorProjects,
                unique: false
            }
        });
    };

    return [Project, SenatorProjects];
};