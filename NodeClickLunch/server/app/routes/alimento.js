const router = require('express').Router();
const { crearAlimento, mostrarAlimentos, eliminarAlimentos, actualizarAlimento, comentariosAlimento } = require('../controllers/alimento.controller');

router.post('/crearAlimento', crearAlimento);

router.get('/mostarAlimentos', mostrarAlimentos);

router.delete('/eliminarAlimentos', eliminarAlimentos);

router.put('/actualizarAlimento', actualizarAlimento);

router.get('/comentariosAlimento', comentariosAlimento);

module.exports = router;