const router = require('express').Router();
const { register, login, update, userData, usersData , logout } = require('../controllers/usuario.controller.js');

router.post('/register', register);
router.post('/login', login);
router.get('/userData', userData);

module.exports = router;