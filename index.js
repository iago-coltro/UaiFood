const express = require('express');
const app = express();
const usuarioRoutes = require('./src/routes/usuarios'); // Importa as rotas

app.use(express.json());

app.use((req, res, next) => {
  console.log("Header Content-Type:", req.headers['content-type']);
  console.log("Body recebido:", req.body);
  next();
});

// Usa as rotas importadas
app.use(usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});