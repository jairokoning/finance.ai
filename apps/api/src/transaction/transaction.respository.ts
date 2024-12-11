import { ListTransactionsDto } from './dtos/list-transactions.dto'
import { Transaction } from './transaction'

export default interface TransactionRepository {
  getTransactions(userId: string): Promise<ListTransactionsDto[]>
  createTransaction(transaction: Transaction): Promise<void>
  updateTransaction(transaction: Transaction, id: string): Promise<void>
  getSummary(userId: string, month: string): Promise<any>
  getCountTransactionsOfMonth(
    userId: string,
    startOfMonth: Date,
    endOfMonth: Date
  ): Promise<number>
}
