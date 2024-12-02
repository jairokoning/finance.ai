import Navbar from '@/app/_components/navbar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'
import { getDashboard } from '@/app/_actions/get-dashboad'
import { isMatch } from 'date-fns'

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

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} {...dashboard} />
      </div>
    </>
  )
}

export default Home
