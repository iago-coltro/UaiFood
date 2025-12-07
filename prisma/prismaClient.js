const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  // No Prisma 7, se a URL não está no schema, passamos aqui
  datasourceUrl: process.env.DATABASE_URL, 
});

module.exports = prisma;