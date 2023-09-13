const express = require('express');
const router = express.Router();


router.get('/sign-in', (req,res) => {
    res.locals.pageTitle = 'Iniciar sesion';
    res.locals.pageDescription = "";
    res.render('signIn');

});
router.get('/sign-up', (req,res) => {
    res.locals.pageTitle = 'Registrate';
    res.locals.pageDescription = "";
    res.render('signUp');
})

module.exports = router;