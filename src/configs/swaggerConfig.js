const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Exemplo com Swagger',
      version: '1.0.0',
      description: 'API para exemplo de documentação Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // Usa 'path.join' para garantir que ache a pasta routes
  // __dirname pega a pasta atual (src/configs) e sobe um nível (..) para entrar em routes
  apis: [path.join(__dirname, '../routes/*.js')], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;