const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o seed do banco de dados...');

  // 1. Criar uma Categoria Padrão (obrigatório para criar restaurante)
  const categoria = await prisma.categoria.upsert({
    where: { nome: 'Geral' },
    update: {},
    create: {
      nome: 'Geral',
    },
  });
  console.log(`✅ Categoria criada: ${categoria.nome}`);

  // 2. Criar o Restaurante Principal
  // O 'upsert' garante que ele só cria se não existir um com ID 1
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