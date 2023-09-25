require('dotenv').config();

const sessionManager = require('../sessionManager')

const { createNewUser, verifiUserAndPwd } = require('../services/authService');
const Session = require('../models/sessionModel');

async function signInUser(req, res){
    try{
        const signInRequest = await verifiUserAndPwd(req.body);
        if(!signInRequest.success){
            return handleMessage(res, signInRequest.message, 'danger', 'signIn');
        }
        sessionManager.createTokenAndCookie(signInRequest.user, res, req)
    }catch(e){
        console.log(e)
    }
}

async function signUpUser(req, res) {
    try {
        const newUserRequest = await createNewUser(req.body);
        if (!newUserRequest.success) {
            return handleMessage(res, newUserRequest.message, 'danger', 'signUp');
        }     
        return handleMessage(res, newUserRequest.message, 'success', 'signIn');
    } catch (error) {
        return handleMessage(res, error.message, 'danger', 'signUp');
    }
}

function handleMessage(res, message, messageType, page) {
    res.locals.message = {
        type: messageType,
        message: message
    };
    res.render(page);
}
async function signOutUser(req, res) {
    try {
        const COOKIE_NAME = process.env.COOKIE_NAME;
        const token = req.cookies[COOKIE_NAME];
        if (token) {
            await Session.destroy({
                where: { token },
            });
        }

        res.clearCookie(COOKIE_NAME);

        return res.redirect('/sign-in');
    } catch (error) {
        console.error(error);
        return res.redirect('/');
    }
}

module.exports = { 
    signUpUser,
    signInUser,
    signOutUser,
};
