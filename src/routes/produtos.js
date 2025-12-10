const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtos');

/**
 * @swagger
 * /api/produtos:
 * post:
 * summary: Cadastra um novo produto no cardápio.
 * description: Cria um item, associando-o automaticamente ao Restaurante Principal.
 * tags:
 * - Produtos
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * example: Pizza Calabresa
 * descricao:
 * type: string
 * example: Molho de tomate, mussarela e calabresa.
 * preco:
 * type: number
 * format: float
 * example: 39.90
 * foto:
 * type: string
 * format: url
 * example: http://link.da.foto/pizza.jpg
 * responses:
 * 201:
 * description: Produto criado com sucesso.
 * 400:
 * description: Erro ao cadastrar produto ou restaurante principal não encontrado.
 */
router.post('/api/produtos', produtoController.criarProduto);

/**
 * @swagger
 * /api/produtos:
 * get:
 * summary: Lista todos os produtos do cardápio.
 * description: Retorna uma lista completa de todos os produtos disponíveis no sistema.
 * tags:
 * - Produtos
 * responses:
 * 200:
 * description: Lista de produtos retornada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Produto'
 * 500:
 * description: Erro ao buscar produtos.
 */
router.get('/api/produtos', produtoController.listarProdutos);

module.exports = router;