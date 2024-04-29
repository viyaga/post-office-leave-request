import RegularEmployee from '@/components/dashboard/employee/regular/RegularEmployee'
import { errResponse } from '@/services'
import next from 'next'

const SERVER_ONE = process.env.SERVER_ONE

const fetchAllOffices = async () => {
  const OFFICE_API = SERVER_ONE + '/office'
  try {
    const response = await fetch(OFFICE_API, { next: { revalidate: 3600 * 24 * 365 } })
    const { offices } = await response.json()
    return offices
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const getAllRegularEmployeesData = async () => {
  const REGULAR_EMPLOYEE_API = SERVER_ONE + '/employee/regular'
  try {
    const response = await fetch(REGULAR_EMPLOYEE_API, { next: { revalidate: 10 } })
    const { employees } = await response.json()
    return employees
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async () => {
  const offices = await fetchAllOffices()
  if (offices?.error) return <p>An Error Occured While Fetching Data</p>

  const regularEmployees = await getAllRegularEmployeesData()
  if (regularEmployees?.error) return <p>An Error Occured While Fetching Data</p>

  return (
    <RegularEmployee offices={offices} regularEmployees={regularEmployees} />
  )
}

export default page