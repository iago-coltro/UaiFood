require('dotenv').config(); // Carrega as variáveis do .env
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/configs/swaggerConfig'); 

// Importação das Rotas da API
const usuarioRoutes = require('./src/routes/usuarios');
const restauranteRoutes = require('./src/routes/restaurantes'); // Nova rota que criamos

const app = express();

// Configurações do Express
app.use(express.json()); // Permite ler JSON no corpo das requisições
app.use(express.static(path.join(__dirname, 'public'))); // Serve os arquivos HTML/CSS/JS

// Middleware de Log
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// --- DOCUMENTAÇÃO ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROTAS DA API ---
app.use(usuarioRoutes);
app.use(restauranteRoutes);

// --- ROTAS DE PÁGINAS (FRONTEND) ---

// 1. Página Inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. Página de Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 3. Página de Cadastro de Usuário
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// 4. Página de Cadastro de Parceiro (Restaurante)
app.get('/parceiro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'parceiro.html'));
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});