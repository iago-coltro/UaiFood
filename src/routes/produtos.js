const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtos');

// Adicionei '/api' na frente para não conflitar com a página HTML
router.post('/api/produtos', produtoController.criarProduto);
router.get('/api/produtos', produtoController.listarProdutos);

module.exports = router;