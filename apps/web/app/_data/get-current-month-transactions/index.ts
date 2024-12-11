import { auth } from '@clerk/nextjs/server'
import { endOfMonth, startOfMonth } from 'date-fns'

export const getCurrentMonthTransactions = async () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  const start = startOfMonth(new Date())
  const end = endOfMonth(new Date())
  const response = await fetch(
    `http://localhost:3333/transactions/current-month/?userId=${userId}&startOfMonth=${start}&endOfMonth=${end}`,
    {
      method: 'get',
    }
  )
  return response.json()
}
