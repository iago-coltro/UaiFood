const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// Garante a leitura da URL do banco
const connectionString = process.env.DATABASE_URL;

// Configura a conexão usando o driver 'pg'
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Inicia o Prisma Client com o adaptador correto
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando o seed do banco de dados...');

  // 1. Criar Categoria Padrão
  const categoria = await prisma.categoria.upsert({
    where: { nome: 'Geral' },
    update: {},
    create: { nome: 'Geral' },
  });
  console.log(`✅ Categoria criada: ${categoria.nome}`);

  // 2. Criar Restaurante Principal
  const restaurante = await prisma.restaurante.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'UaiFood Oficial',
      descricao: 'O melhor sabor da cidade, entregue na sua porta.',
      foto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      avaliacao: 5.0,
      categoriaId: categoria.id
    },
  });
  console.log(`✅ Restaurante Principal criado: ${restaurante.nome}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });