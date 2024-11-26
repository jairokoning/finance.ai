import { Injectable } from '@nestjs/common'
import TransactionRepository from './transaction.respository'
import { Transaction } from './transaction'

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async listTransactions() {
    const output = await this.transactionRepository.getTransactions()
    return output
  }

  async createTransaction(transaction: Transaction) {
    const id = crypto.randomUUID()
    await this.transactionRepository.createTransaction({ ...transaction, id })
  }
}
