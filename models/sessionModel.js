const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnect');
const User = require('./userModel');

class Session extends Model {}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expires: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }

}, {
    timestamps: false, 
    sequelize, 
    modelName: 'Session',
});

Session.belongsTo(User, { foreignKey: 'userId' });

module.exports = Session;