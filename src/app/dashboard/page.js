import PendingLeaveRequest from '@/components/dashboard/pendingLeaveRequest/PendingLeaveRequest'
import { errResponse } from '@/services'

const fetchOffices = async () => {
  const API_URL = process.env.SERVER_ONE + '/employee/substitute/substitutes-offices-holidays'
  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } })
    const { employees, substitutes, offices, holidays } = await response.json()
    
    return { employees, substitutes, offices, holidays }
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async () => {

  const res = await fetchOffices()
  if (res.error) return <p>An error occured try after sometimes</p>

  return (
    <PendingLeaveRequest substitutes={res.substitutes} offices={res.offices} holidays={res.holidays} />
  )
}

export default page