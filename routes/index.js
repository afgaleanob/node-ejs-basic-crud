const express = require('express');
const router = express.Router();

const { signUpUser, signInUser } = require('../controllers/authController');
const{ verifySessionCookie } = require('../sessionManager');

function validateMessage(req, res, next) {
    res.locals.message = res.locals.message || '';
    next();
}
router.get('/', verifySessionCookie, (req, res) => {
    res.send('done')
})
router.get('/sign-in', validateMessage, (req,res) => {
    res.render('signIn');
});

router.get('/sign-up', validateMessage, (req,res) => {
    res.render('signUp');
});

router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);

module.exports = router;