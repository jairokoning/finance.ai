import Navbar from '@/app/_components/navbar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'
import { getDashboard } from '@/app/_actions/get-dashboad'
import { isMatch } from 'date-fns'
import TransactionsPieChart from './_components/transactions-pie-chart'
import ExpensesPerCategory from './_components/expenses-per-category'
import LastTransactions from './_components/last-transactions'
import { canUserAddTransaction } from '@/app/_data/can-user-add-transaction'

interface HomeProps {
  searchParams: {
    month: string
  }
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth()
  if (!userId) redirect('/login')
  const monthIsInvalid = !month || !isMatch(month, 'MM')
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }
  const dashboard = await getDashboard(month)
  const userCanAddTransaction = await canUserAddTransaction()

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
