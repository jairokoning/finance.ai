import { DataTable } from '../../_components/ui/data-table'
import { transactionColumns } from './_columns'
import { Button } from '@/app/_components/ui/button'
import { ArrowDownUpIcon } from 'lucide-react'

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
    <div className="space-y-6 p-6">
      {/* TÍTULO E BOTÃO */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  )
}

export default TransactionsPage
