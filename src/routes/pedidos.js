const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidos');

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     description: Registra um novo pedido no sistema. Pode incluir itens, quantidade, valor total e associação ao usuário autenticado.
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itens:
 *                 type: array
 *                 description: Lista de itens do pedido.
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto_id:
 *                       type: integer
 *                     quantidade:
 *                       type: integer
 *                     preco:
 *                       type: number
 *                       format: float
 *               valor_total:
 *                 type: number
 *                 format: float
 *                 description: Soma total do pedido.
 *               observacoes:
 *                 type: string
 *                 nullable: true
 *               endereco_entrega_id:
 *                 type: integer
 *                 description: ID do endereço selecionado para entrega.
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *       400:
 *         description: Erro ao criar pedido (dados inválidos).
 *       401:
 *         description: Token de autenticação inválido ou ausente.
 *       500:
 *         description: Erro interno ao processar o pedido.
 */
router.post('/pedidos', pedidoController.criarPedido);

module.exports = router;