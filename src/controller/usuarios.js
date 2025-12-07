const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt'); // Importação do bcrypt
const { generateToken } = require('../configs/jwtConfig'); // Importação do gerador de token

const criarUsuario = async (req, res) => {
    const { nome, email, senha, data_nascimento } = req.body;

    try {
        // Criptografa a senha antes de salvar (Passo 4 do PDF)
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada, // Salva a senha criptografada
                data_nascimento: new Date(data_nascimento)
            }
        });

        // Remove a senha do objeto de retorno por segurança
        const { senha: _, ...usuarioSemSenha } = novoUsuario;

        res.status(201).json(usuarioSemSenha);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao criar usuário. Verifique se o email já existe.' });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Busca o usuário pelo email
        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Compara a senha enviada com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = generateToken(usuario.id);

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
};

module.exports = { criarUsuario, login };