const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnect');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
}, {
    timestamps: false, 
    sequelize, 
    modelName: 'User',
});