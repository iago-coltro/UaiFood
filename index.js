require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/configs/swaggerConfig'); 
const usuarioRoutes = require('./src/routes/usuarios');
const PORT = 3000;

app.use(express.json());

//Configura a pasta 'public' para servir arquivos estáticos (CSS, Imagens, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware de Log
app.use((req, res, next) => {
  console.log("Header Content-Type:", req.headers['content-type']);
  console.log("Body recebido:", req.body);
  next();
});

// Usa as rotas de API
app.use(usuarioRoutes);

//Rota Raiz explícita (opcional, pois o express.static já busca o index.html, mas é bom garantir)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a Página de Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para a Página de Cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});