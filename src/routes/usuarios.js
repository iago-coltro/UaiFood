const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarios');

/**
 * @swagger
 * /usuarios:
 * post:
 * summary: Cria um novo usuário
 * description: Adiciona um novo usuário ao sistema com base nas informações fornecidas.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * description: Nome do novo usuário
 * email:
 * type: string
 * description: E-mail do novo usuário
 * senha:
 * type: string
 * description: Senha do novo usuário
 * data_nascimento:
 * type: string
 * format: date
 * description: Data de nascimento do novo usuário (AAAA-MM-DD)
 * responses:
 * 201:
 * description: Usuário criado com sucesso.
 * 400:
 * description: Falha ao criar o usuário.
 */
router.post('/usuarios', usuarioController.criarUsuario);

module.exports = router;