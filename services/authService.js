const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

const cryptSaltRounds = 10;

async function createNewUser({ name, user, mail, pwd, pwd2, pwdConfirmation }) {
    try {
        // all form data is mandatory
        if (!name || !user || !mail || !pwd) {
            return { success: false, message: 'Todos los campos del formulario son obligatorios' };
        }
        // password confirmation
        if (pwdConfirmation && pwd !== pwd2) {
            return { success: false, message: 'La contraseña no coincide con su confirmación' };
        }

        const hashedPwd = await bcrypt.hash(pwd, cryptSaltRounds);

        // user and mail must be unique
        const [newUser, created] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    { user: user },
                    { mail: mail }
                ]
            },
            defaults: {
                user: user,
                mail: mail,
                name: name,
                pwd: hashedPwd 
            }
        });

        if (created) {
            return { success: true, message: `bienvenido ${newUser.name} ahora puedes iniciar sesión con tu cuenta.` };
        }
        return { success: false, message: 'El usuario no fue creado el nombre de usuario o el correo electrónico ya se encuentra en uso' };
    } catch (error) {
        console.error(error);
        throw new Error('Operación rechazada por el servidor intenta de nuevo más tarde');
    }
}

async function verifiUserAndPwd({ user, pwd }) {
    try {
        // user can be mail or user
        const foundUser = await User.findOne({
            where: {
                [Op.or]: [
                    { user: user },
                    { mail: user }
                ]
            }
        });

        if (!foundUser) {
            return { success: false, message: 'Usuario y/o contraseña incorresto(s)' };
        }

        // compare crypted password with request pwd
        const passwordMatch = await bcrypt.compare(pwd, foundUser.pwd);

        if (!passwordMatch) {
            return { success: false, message: 'Usuario y/o contraseña incorresto(s)' };
        }

        return { success: true, message: 'Inicio de sesión exitoso', user: foundUser };
    } catch (error) {
        console.error(error);
        throw new Error('Operación rechazada por el servidor, intenta de nuevo más tarde');
    }
}


module.exports = {
    createNewUser,
    verifiUserAndPwd
};
