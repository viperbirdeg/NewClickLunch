const router = require('express').Router(); 
const { datosPedido, elementosPedido, establecerPedido, rutaAdicional } = require('../controllers/pedido.controller');

router.get('/datosPedido', datosPedido);

router.get('/elementosPedido', elementosPedido);

router.post('/establecerPedido', establecerPedido);

router.post('/rutaAdicional', rutaAdicional);

module.exports = router;