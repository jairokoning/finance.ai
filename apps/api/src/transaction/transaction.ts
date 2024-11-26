export interface Transaction {
  id?: string
  name: string
  type: TransactionType
  amount: number
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
  createdAt: Date
  updatedAt: Date
  userId: string
}

type TransactionType = 'DEPOSIT' | 'EXPENSE' | 'INVESTMENT'

type TransactionCategory =
  | 'HOUSING'
  | 'TRANSPORTATION'
  | 'FOOD'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'UTILITY'
  | 'SALARY'
  | 'EDUCATION'
  | 'OTHER'

type TransactionPaymentMethod =
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'BANK_TRANSFER'
  | 'BANK_SLIP'
  | 'CASH'
  | 'PIX'
  | 'OTHER'
