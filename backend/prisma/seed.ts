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
        drawDate: new Date('2024-08-15'),
        deletedAt: null
      },
      {
        fullName: 'João Santos',
        state: 'RJ',
        city: 'Rio de Janeiro',
        prize: 'Smartphone Top de Linha',
        drawDate: new Date('2024-08-16'),
        deletedAt: null
      },
      {
        fullName: 'Ana Costa',
        state: 'MG',
        city: 'Belo Horizonte',
        prize: 'Viagem para 2 pessoas',
        drawDate: new Date('2024-08-17'),
        deletedAt: null
      },
      {
        fullName: 'Pedro Almeida',
        state: 'SP',
        city: 'Campinas',
        prize: 'Smart TV 50 polegadas',
        drawDate: new Date('2024-08-18'),
        deletedAt: null
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
        latitude: -23.538339190757238,
        longitude: -46.867246595697544,
        deletedAt: null
      },
      {
        name: 'Hipermercado Economia',
        cnpj: '23.456.789/0001-01',
        state: 'RJ',
        city: 'Niterói',
        address: 'Av. Principal, 456 - Boa Viagem',
        latitude: -22.908281285672736, 
        longitude: -43.130600578972754,
        deletedAt: null
      },
      {
        name: 'Mercado da Esquina',
        cnpj: '34.567.890/0001-12',
        state: 'MG',
        city: 'Uberlândia',
        address: 'Praça da Liberdade, 789 - Bairro Novo',
        latitude: -19.93224986500713, 
        longitude: -43.93782574656276,
        deletedAt: null
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
