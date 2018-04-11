'use strict';

module.exports = function(sequelize, DataTypes) {
    var { Mission, AcademicInfo, PastMandate } = require('.');
    var Senator = sequelize.define('Senator', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // Id attributed to it in camara.leg.br services
        fullName: DataTypes.STRING,
        popName: DataTypes.STRING,
        pictureUrl: DataTypes.STRING,
        hometown: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        extincao: DataTypes.DATEONLY,
        profession: DataTypes.ARRAY(DataTypes.STRING),
    });

    Senator.associate = function(model) {
        model.Senator.belongsToMany(model.Mission, {
            through: {
                model: model.SenatorMission,
                unique: false
            }
        });
        model.Senator.belongsToMany(model.PastMandate, {
            through: {
                model: model.SenatorMandates,
                unique: false
            }
        });
        model.Senator.belongsToMany(model.AcademicInfo, {
            through: {
                model: model.SenatorAcademic,
                unique: false
            }
        });
        model.Senator.belongsToMany(model.Comission, {
            through: {
                model: model.SenatorComissions,
                unique: false
            }
        });
        model.Senator.belongsToMany(model.Project, {
            through: {
                model: model.SenatorProjects,
                unique: false
            }
        });
    };
    

    return [Senator];
};