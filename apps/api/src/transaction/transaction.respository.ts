import { ListTransactionsDto } from './dtos/list-transactions.dto'

export default interface TransactionRepository {
  getTransactions(): Promise<ListTransactionsDto[]>
}
