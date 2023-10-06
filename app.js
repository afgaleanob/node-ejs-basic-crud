const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const mainRouter = require('./routes/index');

const app = express();

//views
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());
//to get request params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db
const sequelize = require('./models/dbConnect');
//models
require('./models/userModel');
require('./models/sessionModel');
require('./models/clientModel');

sequelize.sync({ force: false, alter: false });

// routes
app.use('/', mainRouter);

//public
app.use( express.static( process.env.PUBLICDIR ));

//global errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

module.exports = app