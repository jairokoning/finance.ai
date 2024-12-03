import type {
  TransactionCategory,
  TransactionType,
} from '@/app/_dtos/transactions'

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}

export interface TotalExpensePerCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}
