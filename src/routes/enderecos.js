const express = require('express');
const router = express.Router();
const enderecoController = require('../controller/enderecos');

/**
 * @swagger
 * /enderecos:
 *   post:
 *     summary: Cadastra um novo endereço para o usuário.
 *     description: Requer autenticação (Token JWT). Associa o endereço ao usuário logado.
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               cep:
 *                 type: string
 *               complemento:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Endereço cadastrado com sucesso.
 *       400:
 *         description: Erro ao cadastrar endereço.
 *       401:
 *         description: Token de autenticação inválido ou ausente.
 */
router.post('/enderecos', enderecoController.criarEndereco);

/**
 * @swagger
 * /enderecos:
 *   get:
 *     summary: Lista os endereços do usuário.
 *     description: Requer autenticação (Token JWT). Retorna todos os endereços cadastrados pelo usuário logado.
 *     tags:
 *       - Endereços
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Endereco'
 *       500:
 *         description: Erro ao buscar endereços.
 *       401:
 *         description: Token de autenticação inválido ou ausente.
 */
router.get('/enderecos', enderecoController.listarEnderecos);

module.exports = router;