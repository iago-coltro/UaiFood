const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarios');

// Define a rota POST /usuarios chamando a função do controller
router.post('/usuarios', usuarioController.criarUsuario);

module.exports = router;