const sessionManager = require('../sessionManager')
const { createNewUser, verifiUserAndPwd } = require('../services/authService');

async function signInUser(req, res){
    try{
        const signInRequest = await verifiUserAndPwd(req.body);
        if(!signInRequest.success){
            return handleMessage(res, signInRequest.message, 'danger', 'signIn');
        }
        sessionManager.createTokenAndCookie(signInRequest.user, res)
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

module.exports = { 
    signUpUser,
    signInUser
};
