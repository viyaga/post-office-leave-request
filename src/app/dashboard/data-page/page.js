import DataPage from "@/components/dashboard/shared/dataPage/DataPage"
import { dateToIsoString } from "@/services"

const page = async ({ searchParams }) => {

  const category = searchParams?.cat || "pending"
  const fromDate = searchParams?.fromDate || dateToIsoString(Date.now())
  const toDate = searchParams?.toDate || dateToIsoString(Date.now())
  
  return (
    <DataPage category={category} fromDate={fromDate} toDate={toDate} />
  )
}

export default page
