'use strict';

module.exports = function(sequelize, DataTypes) {
    var AcademicInfo = sequelize.define('AcademicInfo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        course: DataTypes.STRING,
        degree: DataTypes.STRING,
        institution: DataTypes.STRING,
        location: DataTypes.STRING
        
    });

    var SenatorAcademic = sequelize.define('SenatorAcademic', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        academicInfoId: DataTypes.INTEGER,
        senatorId: DataTypes.INTEGER
    });

    AcademicInfo.associate = function(model) {
        model.AcademicInfo.belongsToMany(model.Senator, {
            through: {
                model: model.SenatorAcademic,
                unique: false
            }
        });
    };

    return [AcademicInfo, SenatorAcademic];
};