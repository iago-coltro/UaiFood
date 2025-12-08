const express = require('express');
const router = express.Router();
const enderecoController = require('../controller/enderecos');

router.post('/enderecos', enderecoController.criarEndereco);
router.get('/enderecos', enderecoController.listarEnderecos);

module.exports = router;