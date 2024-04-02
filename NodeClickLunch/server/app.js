const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const usuarioRouter = require('./app/routes/usuario.js');
const path = require('path');
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(session({
    secret: 'amasemetiootropejelagarto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        //secure: false,//Pedir SSL
        httpOnly: true,
    }
}));

//Rutas
app.use('/usuario', usuarioRouter);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

//Ruta de "apoyo"
app.get("/api", (req, res) => {
    res.json({ message: "Servidor Activo!" });
});


//Ruta default
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});





module.exports = { app };