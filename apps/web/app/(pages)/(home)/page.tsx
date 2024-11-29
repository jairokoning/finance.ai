import Navbar from '@/app/_components/navbar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SummaryCards from './_components/summary-cards'

const Home = async () => {
  const { userId } = auth()
  if (!userId) redirect('/login')

  return (
    <>
      <Navbar />
      <SummaryCards
        month="Janeiro"
        balance={1000}
        depositsTotal={200}
        investmentsTotal={300}
        expensesTotal={400}
      />
    </>
  )
}

export default Home
