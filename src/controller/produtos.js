const prisma = require('../../prisma/prismaClient');

const criarProduto = async (req, res) => {
    // Não recebemos mais 'restauranteId' do corpo da requisição
    const { nome, descricao, preco, foto } = req.body;

    try {
        // Busca o primeiro restaurante cadastrado no banco para vincular o produto
        const restauranteUnico = await prisma.restaurante.findFirst();

        if (!restauranteUnico) {
            return res.status(400).json({ 
                error: 'Nenhum restaurante principal encontrado no sistema. Cadastre um via Banco de Dados.' 
            });
        }

        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                foto,
                preco: parseFloat(preco),
                restauranteId: restauranteUnico.id // Vincula automaticamente
            }
        });
        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao cadastrar produto.' });
    }
};

module.exports = { criarProduto };