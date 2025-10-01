import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  console.log('📝 Limpando dados existentes...')
  await prisma.winner.deleteMany({})
  await prisma.store.deleteMany({})

  console.log('🏆 Criando ganhadores...')
  const winners = await prisma.winner.createMany({
    data: [
      {
        fullName: 'Maria Silva',
        state: 'SP',
        city: 'São Paulo',
        prize: 'Smart TV 50 polegadas',
        drawDate: new Date('2024-08-15')
      },
      {
        fullName: 'João Santos',
        state: 'RJ',
        city: 'Rio de Janeiro',
        prize: 'Smartphone Top de Linha',
        drawDate: new Date('2024-08-16')
      },
      {
        fullName: 'Ana Costa',
        state: 'MG',
        city: 'Belo Horizonte',
        prize: 'Viagem para 2 pessoas',
        drawDate: new Date('2024-08-17')
      },
      {
        fullName: 'Pedro Almeida',
        state: 'SP',
        city: 'Campinas',
        prize: 'Smart TV 50 polegadas',
        drawDate: new Date('2024-08-18')
      }
    ]
  })

  console.log(`✅ ${winners.count} ganhadores criados!`)

  console.log('🏪 Criando lojas participantes...')
  const stores = await prisma.store.createMany({
    data: [
      {
        name: 'Supermercado Bom Preço',
        cnpj: '12.345.678/0001-90',
        state: 'SP',
        city: 'São Paulo',
        address: 'Rua das Flores, 123 - Centro',
        latitude: -23.5505,
        longitude: -46.6333
      },
      {
        name: 'Hipermercado Economia',
        cnpj: '23.456.789/0001-01',
        state: 'RJ',
        city: 'Niterói',
        address: 'Av. Principal, 456 - Boa Viagem',
        latitude: -22.8833,
        longitude: -43.1036
      },
      {
        name: 'Mercado da Esquina',
        cnpj: '34.567.890/0001-12',
        state: 'MG',
        city: 'Uberlândia',
        address: 'Praça da Liberdade, 789 - Bairro Novo',
        latitude: -18.9188,
        longitude: -48.2766
      }
    ]
  })

  console.log(`✅ ${stores.count} lojas criadas!`)

  console.log('🎉 Seed concluída com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
