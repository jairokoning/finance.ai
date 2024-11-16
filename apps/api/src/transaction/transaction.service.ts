import { Injectable } from '@nestjs/common'
import TransactionRepository from './transaction.respository'

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async listTransactions() {
    const output = await this.transactionRepository.getTransactions()
    return output
  }
}
