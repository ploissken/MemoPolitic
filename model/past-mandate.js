'use strict';

module.exports = function(sequelize, DataTypes) {
    var { Senator } = require('.');
    var PastMandate = sequelize.define('PastMandate', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        mandateType: DataTypes.STRING,
        mandateStart: DataTypes.DATEONLY,
        mandateEnd: DataTypes.DATEONLY
 
    });

    var SenatorMandates = sequelize.define('SenatorMandates', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pastMandateId: DataTypes.INTEGER,
        senatorId: DataTypes.INTEGER
    });

    PastMandate.associate = function(model) {
        model.PastMandate.belongsTo(model.Senator, {as: 'Senator'});
    };

    return [PastMandate, SenatorMandates];
};