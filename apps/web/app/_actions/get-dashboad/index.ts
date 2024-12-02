'use server'
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@/app/_dtos/transactions'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

interface UpsertTransactionParams {
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const getDashboard = async (month: string) => {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')
  const response = await fetch(
    `http://localhost:3333/transactions/summary/${userId}/?month=${month}`,
    {
      method: 'get',
    }
  )

  return response.json()
}
