const express = require('express');
const router = express.Router();

const { signUpUser, signInUser, signOutUser } = require('../controllers/authController');
const{ isLoggedIn, isNotLoggedIn } = require('../sessionManager');

function validateMessage(req, res, next) {
    res.locals.message = res.locals.message || '';
    next();
}
router.get('/', isLoggedIn, (req, res) => {
    res.send('done')
})
router.get('/sign-in', isNotLoggedIn, validateMessage, (req,res) => {
    res.render('signIn');
});

router.get('/sign-up', isNotLoggedIn, validateMessage, (req,res) => {
    res.render('signUp');
});

router.get('/sign-out', signOutUser);
router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);

module.exports = router;