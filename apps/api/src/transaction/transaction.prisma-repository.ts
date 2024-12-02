import { PrismaService } from '../prisma/prisma.service'
import TransactionRepository from './transaction.respository'
import { ListTransactionsDto } from './dtos/list-transactions.dto'
import { Injectable } from '@nestjs/common'
import { Transaction } from './transaction'

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getSummary(userId: string, month: string): Promise<any> {
    const where = {
      userId,
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    }
    const depositsTotal = Number(
      (
        await this.prisma.transaction.aggregate({
          where: { ...where, type: 'DEPOSIT' },
          _sum: { amount: true },
        })
      )?._sum?.amount
    )
    const investmentsTotal = Number(
      (
        await this.prisma.transaction.aggregate({
          where: { ...where, type: 'INVESTMENT' },
          _sum: { amount: true },
        })
      )?._sum?.amount
    )
    const expensesTotal = Number(
      (
        await this.prisma.transaction.aggregate({
          where: { ...where, type: 'EXPENSE' },
          _sum: { amount: true },
        })
      )?._sum?.amount
    )
    const balance = depositsTotal - investmentsTotal - expensesTotal
    const transactionsTotal = Number(
      (
        await this.prisma.transaction.aggregate({
          where,
          _sum: { amount: true },
        })
      )._sum.amount
    )

    return {
      balance,
      depositsTotal,
      investmentsTotal,
      expensesTotal,
      transactionsTotal,
    }
  }
  async updateTransaction(transaction: Transaction, id: string): Promise<void> {
    await this.prisma.transaction.update({
      data: transaction,
      where: {
        id,
      },
    })
  }

  async createTransaction(transaction: Transaction): Promise<void> {
    await this.prisma.transaction.create({
      data: transaction,
    })
  }

  async getTransactions(userId: string): Promise<ListTransactionsDto[]> {
    const transactionsData = await this.prisma.transaction.findMany({
      where: {
        userId,
      },
    })
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
