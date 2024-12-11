import { Injectable } from '@nestjs/common'
import TransactionRepository from './transaction.respository'
import { Transaction } from './transaction'

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async listTransactions(userId: string) {
    const output = await this.transactionRepository.getTransactions(userId)
    return output
  }

  async createTransaction(transaction: Transaction) {
    const id = crypto.randomUUID()
    await this.transactionRepository.createTransaction({ ...transaction, id })
  }

  async updateTransaction(transaction: Transaction, id: string) {
    await this.transactionRepository.updateTransaction(transaction, id)
  }

  async getSummary(userId: string, month: string) {
    return this.transactionRepository.getSummary(userId, month)
  }

  async getCountOfMonthTransactions(
    userId: string,
    startOfMonth: Date,
    endOfMonth: Date
  ) {
    return this.transactionRepository.getCountTransactionsOfMonth(
      userId,
      startOfMonth,
      endOfMonth
    )
  }
}
