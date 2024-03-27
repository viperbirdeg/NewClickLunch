const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const usuarioRouter = require('./app/routes/usuario.js');
const path = require('path');

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/usuario', usuarioRouter);

module.exports = app;