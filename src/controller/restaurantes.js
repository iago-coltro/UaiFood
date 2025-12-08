const prisma = require('../../prisma/prismaClient');

const criarRestaurante = async (req, res) => {
    const { nome, descricao, foto, categoriaId } = req.body;

    try {
        // Converte categoriaId para Inteiro, pois vem como string do form
        const restaurante = await prisma.restaurante.create({
            data: {
                nome,
                descricao,
                foto,
                categoriaId: parseInt(categoriaId)
            }
        });

        res.status(201).json(restaurante);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao cadastrar restaurante. Verifique se a categoria existe.' });
    }
};

module.exports = { criarRestaurante };