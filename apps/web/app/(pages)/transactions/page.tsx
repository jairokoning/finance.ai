import AddTransactionButton from '@/app/_components/add-transaction-button'
import { DataTable } from '../../_components/ui/data-table'
import { transactionColumns } from './_columns'
import Navbar from '@/app/_components/navbar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const TransactionsPage = async () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/login')
  }

  const response = await fetch(
    //`${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    `http://localhost:3333/transactions/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const transactions = await response.json()

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  )
}

export default TransactionsPage
