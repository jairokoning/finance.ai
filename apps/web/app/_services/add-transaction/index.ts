'use server'
import type { Transaction } from '@/app/_dtos/transactions'
import { auth } from '@clerk/nextjs/server'

export const addTransaction = async (params: Transaction) => {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')
  await fetch(
    // `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    'http://localhost:3333/transactions',
    {
      method: 'post',
      headers: {
        Authorization: 'Bearer',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, userId }),
    }
  )
}
