export type ListTransactionsDto = {
  id: string
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

// export enum TransactionType {
//   DEPOSIT = 'Deposito',
//   EXPENSE = 'Despesa',
//   INVESTMENT = 'Investimento',
// }

// export enum TransactionCategory {
//   HOUSING = 'HOUSING',
//   TRANSPORTATION = 'TRANSPORTATION',
//   FOOD = 'FOOD',
//   ENTERTAINMENT = 'ENTERTAINMENT',
//   HEALTH = 'HEALTH',
//   UTILITY = 'UTILITY',
//   SALARY = 'SALARY',
//   EDUCATION = 'EDUCATION',
//   OTHER = 'OTHER',
// }

// export enum TransactionPaymentMethod {
//   CREDIT_CARD = 'CREDIT_CARD',
//   DEBIT_CARD = 'DEBIT_CARD',
//   BANK_TRANSFER = 'BANK_TRANSFER',
//   BANK_SLIP = 'BANK_SLIP',
//   CASH = 'CASH',
//   PIX = 'PIX',
//   OTHER = 'OTHER',
// }
