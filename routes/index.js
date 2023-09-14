const { signUpUser } = require('../controllers/authController')

const express = require('express');
const router = express.Router();

function validateMessage(req, res, next) {
    res.locals.message = res.locals.message || '';
    next();
}

router.get('/sign-in',validateMessage, (req,res) => {
    res.render('signIn');
});

router.get('/sign-up',validateMessage, (req,res) => {
    res.render('signUp');
});

router.post('/sign-up', signUpUser);


module.exports = router;