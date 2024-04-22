import RegularEmployee from '@/components/dashboard/employee/regular/RegularEmployee'

const fetchAllOffices = async () => {
  const OFFICE_API = process.env.SERVER_ONE + '/office'
  try {
    const response = await fetch(OFFICE_API, { next: { revalidate: 3600 * 24 * 365 } })
    const { offices } = await response.json()
    return offices
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async () => {
  const offices = await fetchAllOffices()
  
  return (
    <RegularEmployee offices={offices} />
  )
}

export default page