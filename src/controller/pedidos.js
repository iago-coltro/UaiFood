const prisma = require('../../prisma/prismaClient');
const jwt = require('jsonwebtoken');

const getUserId = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    return decoded.id;
};

const criarPedido = async (req, res) => {
    const { itens, total, enderecoId } = req.body; // itens = [{ produtoId, quantidade, precoUnit }]

    try {
        const usuarioId = getUserId(req);
        
        // Pega o restaurante principal (regra de negócio atual)
        const restaurante = await prisma.restaurante.findFirst();
        if (!restaurante) return res.status(400).json({ error: 'Restaurante não encontrado.' });

        // Cria o pedido e os itens em uma transação
        const pedido = await prisma.pedido.create({
            data: {
                usuarioId,
                restauranteId: restaurante.id,
                enderecoId: parseInt(enderecoId),
                total: parseFloat(total),
                status: 'PENDENTE',
                itens: {
                    create: itens.map(item => ({
                        produtoId: item.produtoId,
                        quantidade: item.quantidade,
                        precoUnit: item.precoUnit
                    }))
                }
            },
            include: { itens: true } // Retorna os itens na resposta
        });

        res.status(201).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao criar pedido.' });
    }
};

module.exports = { criarPedido };