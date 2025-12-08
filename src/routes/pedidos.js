const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidos');

router.post('/pedidos', pedidoController.criarPedido);

module.exports = router;