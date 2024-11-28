import { ListTransactionsDto } from './dtos/list-transactions.dto'
import { Transaction } from './transaction'

export default interface TransactionRepository {
  getTransactions(): Promise<ListTransactionsDto[]>
  createTransaction(transaction: Transaction): Promise<void>
  updateTransaction(transaction: Transaction, id: string): Promise<void>
}
