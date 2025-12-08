const express = require('express');
const router = express.Router();
const restauranteController = require('../controller/restaurantes');

/**
 * @swagger
 * /restaurantes:
 * post:
 * summary: Cadastra um novo restaurante
 * tags: 
 * - Restaurantes
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * descricao:
 * type: string
 * foto:
 * type: string
 * categoriaId:
 * type: integer
 * responses:
 * 201:
 * description: Restaurante criado com sucesso
 * 400:
 * description: Erro ao cadastrar
 */
router.post('/restaurantes', restauranteController.criarRestaurante);

module.exports = router;