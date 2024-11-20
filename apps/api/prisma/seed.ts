import { PrismaClient, Prisma } from '@prisma/client'
import { Transaction } from 'prisma/prisma-client'

const prisma = new PrismaClient()

const transactions: Transaction[] = [
  {
    id: '071fa0b7-6733-4fd2-8d94-c7e4e0adaa27',
    name: 'Salário',
    type: 'DEPOSIT',
    amount: new Prisma.Decimal(10000.0),
    category: 'SALARY',
    paymentMethod: 'PIX',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '666bcc6d-99b2-4e41-a47e-31848e60a208',
  },
  {
    id: 'ecc9114a-065d-44b4-a28e-c2bd27d3f0c3',
    name: 'Corte de cabelo',
    type: 'EXPENSE',
    amount: new Prisma.Decimal(35.0),
    category: 'OTHER',
    paymentMethod: 'PIX',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '666bcc6d-99b2-4e41-a47e-31848e60a208',
  },
  {
    id: 'f7ae6de8-5937-43a3-8352-341e1c54782c',
    name: 'Corte de cabelo',
    type: 'INVESTMENT',
    amount: new Prisma.Decimal(500.0),
    category: 'OTHER',
    paymentMethod: 'BANK_TRANSFER',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '666bcc6d-99b2-4e41-a47e-31848e60a208',
  },
  {
    id: '4a0c73cb-b7e9-4be0-8cdf-70c2ab24cb41',
    name: 'Corte de cabelo',
    type: 'DEPOSIT',
    amount: new Prisma.Decimal(7000.0),
    category: 'SALARY',
    paymentMethod: 'PIX',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '11c4be21-bc4d-45b7-94ff-132938565272',
  },
  {
    id: 'f8f7f7e6-b8f6-47e5-939a-b73cb56d4532',
    name: 'Supermecado',
    type: 'EXPENSE',
    amount: new Prisma.Decimal(800.0),
    category: 'FOOD',
    paymentMethod: 'DEBIT_CARD',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '11c4be21-bc4d-45b7-94ff-132938565272',
  },
]

async function seed() {
  await prisma.transaction.createMany({
    data: transactions as Transaction[],
  })
}

seed()
