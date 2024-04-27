import DataPage from "@/components/dashboard/shared/dataPage/DataPage"
import { dateToIsoString } from "@/services"

const fetchData = async () => {
  const API_URL = process.env.SERVER_ONE + '/employee/substitute/substitutes-employees'
  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } })
    const { employees, substitutes } = await response.json()

    return { employees, substitutes }
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async ({ searchParams }) => {

  const res = await fetchData()
  if (res.error) return <p>An error occured try after sometimes</p>

  const category = searchParams?.cat || "pending"
  const fromDate = searchParams?.fromDate || dateToIsoString(Date.now())
  const toDate = searchParams?.toDate || dateToIsoString(Date.now())
  const officeId = searchParams?.officeId || 0
  const employeeId = searchParams?.employeeId || 0
  const substituteId = searchParams?.substituteId || 0
  const remarks = searchParams?.remarks || 0

  return (
    <DataPage
      substitutes={res.substitutes} employees={res.employees}
      category={category} fromDate={fromDate} toDate={toDate} officeId={officeId}
      employeeId={employeeId} substituteId={substituteId} remarks={remarks}
    />
  )
}

export default page
