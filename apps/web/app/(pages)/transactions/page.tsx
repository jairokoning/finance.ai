import AddTransactionButton from '@/app/_components/add-transaction-button'
import { DataTable } from '../../_components/ui/data-table'
import { transactionColumns } from './_columns'
import { Button } from '@/app/_components/ui/button'
import { ArrowDownUpIcon } from 'lucide-react'
import Navbar from '@/app/_components/navbar'

const TransactionsPage = async () => {
  const response = await fetch(
    //`${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    'http://localhost:3333/transactions',
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
