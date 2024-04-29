import PendingLeaveRequest from '@/components/dashboard/pendingLeaveRequest/PendingLeaveRequest'
import { errResponse } from '@/services'

const fetchData = async () => {
  const API_URL = process.env.SERVER_ONE + '/employee/substitute/substitutes-employees-holidays'
  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } })
    const { employees, substitutes, holidays } = await response.json()

    return { employees, substitutes, holidays }
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const getPendngLeaveData = async () => {
  const LEAVE_API = process.env.SERVER_ONE + '/leaves'

  try {
    const response = await fetch(`${LEAVE_API}/pending`, { next: { revalidate: 10 } })
    const { leaves } = await response.json()
    return leaves
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async () => {

  const res = await fetchData()
  if (res.error) return <p>An error occured try after sometimes</p>

  const pendingLeaveData = await getPendngLeaveData()
  if (pendingLeaveData.error) return <p>An error occured try after sometimes</p>

  return (
    <PendingLeaveRequest substitutes={res.substitutes} employees={res.employees} holidays={res.holidays} pendingLeaveData={pendingLeaveData} />
  )
}

export default page