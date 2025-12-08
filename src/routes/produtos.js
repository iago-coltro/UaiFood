const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtos');

router.post('/produtos', produtoController.criarProduto);

module.exports = router;