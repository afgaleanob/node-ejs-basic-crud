const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnect');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
    },
}, {
    timestamps: false, 
    sequelize, 
    modelName: 'User',
});

module.exports = User;