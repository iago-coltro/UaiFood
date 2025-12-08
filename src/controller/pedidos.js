const prisma = require('../../prisma/prismaClient');
const jwt = require('jsonwebtoken');

const getUserId = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    return decoded.id;
};

const criarPedido = async (req, res) => {
    // Adicionamos 'metodoPagamento' na desestruturação
    const { itens, total, enderecoId, metodoPagamento } = req.body;

    try {
        const usuarioId = getUserId(req);
        
        const restaurante = await prisma.restaurante.findFirst();
        if (!restaurante) return res.status(400).json({ error: 'Restaurante não encontrado.' });

        const pedido = await prisma.pedido.create({
            data: {
                usuarioId,
                restauranteId: restaurante.id,
                enderecoId: parseInt(enderecoId),
                total: parseFloat(total),
                status: 'PENDENTE',
                metodoPagamento: metodoPagamento, // Salva o método escolhido
                itens: {
                    create: itens.map(item => ({
                        produtoId: item.produtoId,
                        quantidade: item.quantidade,
                        precoUnit: item.precoUnit
                    }))
                }
            },
            include: { itens: true }
        });

        res.status(201).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao criar pedido.' });
    }
};

module.exports = { criarPedido };