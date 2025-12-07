const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API UaiFood',
      version: '1.0.0',
      description: 'Documentação da API de Delivery',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // MUDANÇA IMPORTANTE: Use o caminho relativo direto a partir da raiz do projeto
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;