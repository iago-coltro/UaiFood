const prisma = require('../../prisma/prismaClient');
const jwt = require('jsonwebtoken');

// Função auxiliar para pegar ID do usuário pelo Token
const getUserId = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    return decoded.id;
};

const criarEndereco = async (req, res) => {
    const { rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

    try {
        const usuarioId = getUserId(req);

        const endereco = await prisma.endereco.create({
            data: {
                rua, numero, bairro, cidade, estado, cep, complemento,
                usuarioId
            }
        });
        res.status(201).json(endereco);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar endereço.' });
    }
};

const listarEnderecos = async (req, res) => {
    try {
        const usuarioId = getUserId(req);
        const enderecos = await prisma.endereco.findMany({
            where: { usuarioId }
        });
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereços.' });
    }
};

module.exports = { criarEndereco, listarEnderecos };