'use server'
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@/app/_dtos/transactions'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

interface UpsertTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')
  await fetch(
    // `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    'http://localhost:3333/transactions',
    {
      method: params.id ? 'put' : 'post',
      headers: {
        Authorization: 'Bearer',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, userId }),
    }
  )

  revalidatePath('/transactions')
}
