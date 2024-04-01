const router = require('express').Router();
const { register, login, update, userData, usersData, logout } = require('../controllers/usuario.controller.js');

//Registrar usuario
router.post('/register', register);

//Iniciar sesion
router.post('/login', login);

//Salir de la sesion
router.post('/logout', logout);

//Actualizar usuario
router.put('/update', update);

//Obtener todos los registros
router.get('/usersData', usersData);

//Obtener un registro
router.get('/userData', userData);

module.exports = router;