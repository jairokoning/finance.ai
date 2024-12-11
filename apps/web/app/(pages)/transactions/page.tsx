import AddTransactionButton from '@/app/_components/add-transaction-button'
import { DataTable } from '../../_components/ui/data-table'
import { transactionColumns } from './_columns'
import Navbar from '@/app/_components/navbar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { canUserAddTransaction } from '@/app/_data/can-user-add-transaction'

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
  const userCanAddTransaction = await canUserAddTransaction()

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  )
}

export default TransactionsPage
