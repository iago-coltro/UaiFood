const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarios');

/**
 * @swagger
 * /usuarios:
 * post:
 * summary: Cria um novo usuário
 * description: Adiciona um novo usuário ao sistema com base nas informações fornecidas.
 * tags: 
 * - Usuários
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * email:
 * type: string
 * senha:
 * type: string
 * data_nascimento:
 * type: string
 * format: date
 * responses:
 * 201:
 * description: Usuário criado com sucesso.
 * 400:
 * description: Falha ao criar o usuário.
 */
router.post('/usuarios', usuarioController.criarUsuario);

/**
 * @swagger
 * /login:
 * post:
 * summary: Autentica um usuário e retorna um Token JWT
 * description: Verifica email e senha para liberar acesso.
 * tags: 
 * - Autenticação
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * example: maria@daw.com
 * senha:
 * type: string
 * example: senhaSegura123
 * responses:
 * 200:
 * description: Login realizado com sucesso (Retorna Token).
 * 401:
 * description: Credenciais inválidas.
 */
router.post('/login', usuarioController.login);

module.exports = router;