import { Test, TestingModule } from '@nestjs/testing'
import { TransactionService } from './transaction.service'
import { PrismaService } from '../prisma/prisma.service'
import TransactionRepository from './transaction.respository'
import { TransactionPrismaRepository } from './transaction.prisma-repository'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'

const userId = crypto.randomUUID()

const transactionsArray = [
  {
    id: '40166513-eee9-4946-8eda-2a9489cf9a50',
    name: 'Salário',
    type: 'DEPOSIT',
    amount: 10000,
    category: 'SALARY',
    paymentMethod: 'PIX',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
  },
  {
    id: '72a7ed22-bdf2-4744-a32d-d6466a2e78cc',
    name: 'Compras no supermercado',
    type: 'EXPENSE',
    amount: 780,
    category: 'FOOD',
    paymentMethod: 'DEBIT_CARD',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
  },
  {
    id: '1c19d49f-c6fb-4254-8104-2579d9e4bf20',
    name: 'Compras Online',
    type: 'EXPENSE',
    amount: 189,
    category: 'UTILITY',
    paymentMethod: 'CREDIT_CARD',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
  },
]

const transaction = {
  name: 'Compras Online',
  type: TransactionType.EXPENSE,
  amount: 189,
  category: TransactionCategory.UTILITY,
  paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId,
}

const db = {
  transaction: {
    findMany: jest.fn().mockResolvedValue(transactionsArray),
    findUnique: jest.fn().mockResolvedValue(transaction),
    findFirst: jest.fn().mockResolvedValue(transaction),
    create: jest.fn().mockReturnValue(transaction),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(transaction),
    delete: jest.fn().mockResolvedValue(transaction),
  },
}

describe('TransactionService', () => {
  let service: TransactionService
  //let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionService,
          useFactory: (transactionRepository: TransactionRepository) =>
            new TransactionService(transactionRepository),
          inject: [TransactionPrismaRepository],
        },
        {
          provide: TransactionPrismaRepository,
          useFactory: (prismaService: PrismaService) =>
            new TransactionPrismaRepository(prismaService),
          inject: [PrismaService],
        },
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<TransactionService>(TransactionService)
    // prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should list transactions', async () => {
    const output = await service.listTransactions()
    expect(output).toEqual(transactionsArray)
  })
})
