import Holidays from "@/components/dashboard/holidays/Holidays"

const HOLIDAY_API = process.env.SERVER_ONE + '/holiday'

const getAllHolidayData = async () => {
  try {
    const response = await fetch(HOLIDAY_API)
    const { holidays } = await response.json()
    return holidays
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async () => {
  
  const holidayData = await getAllHolidayData()
  if (holidayData.error) return <p>An Error Occured While Fetching Data</p>

  return (
    <Holidays holidayData={holidayData} />
  )
}

export default page