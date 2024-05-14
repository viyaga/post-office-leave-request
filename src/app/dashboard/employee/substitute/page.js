import SubstituteEmployee from '@/components/dashboard/employee/substitute/SubstituteEmployee'

const SUBSTITUTE_API = process.env.SERVER_ONE + '/employee/substitute'

const getAllSubstituteEmployeesData = async () => {
  try {
    const response = await fetch(SUBSTITUTE_API)
    const { employees } = await response.json()
    return employees
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async () => {
  const substituteEmployeeData = await getAllSubstituteEmployeesData()
  if (substituteEmployeeData?.error) return <p>An Error Occured While Fetching Data</p>
  
  return (
    <SubstituteEmployee substituteEmployeeData={substituteEmployeeData} />
  )
}

export default page