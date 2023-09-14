const { createNewUser } = require('../services/authService');

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

module.exports = { signUpUser };
