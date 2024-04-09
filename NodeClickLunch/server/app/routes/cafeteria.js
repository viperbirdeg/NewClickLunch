const router = require('express').Router();
const { agregarCafeteria, mostrarCafeterias, eliminarCafeteria, mostrarAlimentos } = require('../controllers/cafeteria.controller');

router.post('/agregarCafeteria', agregarCafeteria);

router.get('/mostrarCafeterias', mostrarCafeterias);

router.delete('/eliminarCafeteria', eliminarCafeteria);

router.get('/mostrarAlimentos', mostrarAlimentos);

module.exports = router;