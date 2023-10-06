const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnect');
const Session = require('./sessionModel');

class Client extends Model { }

Client.init(
    {
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        socket: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'Client',
    }
);

Client.belongsTo(Session, { foreignKey: 'sessionId' });

module.exports = Client;
