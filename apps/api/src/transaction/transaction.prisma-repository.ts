import { PrismaService } from '../prisma/prisma.service'
import TransactionRepository from './transaction.respository'
import { ListTransactionsDto } from './dtos/list-transactions.dto'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getTransactions(): Promise<ListTransactionsDto[]> {
    const transactionsData = await this.prisma.transaction.findMany()
    const transactions = transactionsData.map(transaction => {
      return {
        id: transaction.id,
        name: transaction.name,
        type: transaction.type,
        amount: Number(transaction.amount),
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        date: transaction.date,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        userId: transaction.userId,
      }
    })
    return transactions
  }
}
