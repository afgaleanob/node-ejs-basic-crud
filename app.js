const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const port = process.env.PORT || 3000;
const mainRouter = require('./routes/index');

const app = express();

//views
app.set('view engine', 'ejs');
app.set('views', 'views' );

//to get request params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db
const sequelize = require('./models/dbConnect');
//models
require('./models/userModel');

sequelize.sync({ force: false, alter: false });

// routes
app.use('/', mainRouter);

//public
app.use( express.static( process.env.PUBLICDIR ));

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}.`);
});

//global errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});