const prisma = require('../../prisma/prismaClient');

const criarProduto = async (req, res) => {
    const { nome, descricao, preco, foto } = req.body;

    try {
        const restauranteUnico = await prisma.restaurante.findFirst();

        if (!restauranteUnico) {
            return res.status(400).json({ 
                error: 'Nenhum restaurante principal encontrado no sistema.' 
            });
        }

        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                foto,
                preco: parseFloat(preco),
                restauranteId: restauranteUnico.id
            }
        });
        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao cadastrar produto.' });
    }
};

// --- NOVA FUNÇÃO ---
const listarProdutos = async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();
        res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
};

module.exports = { criarProduto, listarProdutos };