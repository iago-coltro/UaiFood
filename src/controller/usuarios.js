// Importa o cliente prisma que criamos no passo 1
// O caminho '../..' volta duas pastas para achar a pasta 'prisma' na raiz
const prisma = require('../../prisma/prismaClient');

const criarUsuario = async (req, res) => {
  const { nome, email, senha, data_nascimento } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        data_nascimento: new Date(data_nascimento) // Converte string para Date
      }
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    // É bom logar o erro para saber o que aconteceu (ex: email duplicado)
    console.error(error); 
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

module.exports = { criarUsuario };