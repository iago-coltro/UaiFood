const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('API rodando...');
});

app.listen(port, () => {
    console.log(`Servidor roandando na porta:${port}`);
});