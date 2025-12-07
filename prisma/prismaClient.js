// prisma/prismaClient.js
require('dotenv').config(); // Carrega as variáveis do .env
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;

// Configura o pool de conexão do Postgres
const pool = new Pool({ connectionString });

// Configura o adaptador do Prisma para usar o pool
const adapter = new PrismaPg(pool);

// Inicia o Prisma Client passando o adaptador
const prisma = new PrismaClient({ adapter });

module.exports = prisma;