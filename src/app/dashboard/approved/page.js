import AllApprovedLeaves from "@/components/dashboard/allApprovedLeaves/AllApprovedLeaves"
import { dateToIsoString, errResponse } from "@/services"

const fetchData = async () => {
    const API_URL = process.env.SERVER_ONE + '/employee/substitute/substitutes-employees'
    try {
        const response = await fetch(API_URL, { next: { revalidate: 2 } })
        const { employees, substitutes } = await response.json()

        return { employees, substitutes }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const getLeaveDataByCategory = async (leaveType, fromDate, toDate, officeId, employeeId, substituteId, remarks) => {
    const LEAVE_API = process.env.SERVER_ONE + '/leaves'

    try {
        const response = await fetch(`${LEAVE_API}/${leaveType}/${fromDate}/${toDate}/${officeId}/${employeeId}/${substituteId}/${remarks}`, { next: { revalidate: 2 } })
        const { leaves } = await response.json()
        return leaves
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const page = async ({ searchParams }) => {

    const res = await fetchData()
    if (res.error) return <p>An error occured while fetching try after sometimes</p>

    const leaveType = searchParams?.cat || 0
    const fromDate = searchParams?.fromDate || dateToIsoString(Date.now())
    const toDate = searchParams?.toDate || dateToIsoString(Date.now())
    const officeId = searchParams?.officeId || 0
    const employeeId = searchParams?.employeeId || 0
    const substituteId = searchParams?.substituteId || 0
    const remarks = searchParams?.remarks || 0

    const leaves = await getLeaveDataByCategory(leaveType, fromDate, toDate, officeId, employeeId, substituteId, remarks)
    if (leaves.error) return <p>An error occured while fetching data try after sometimes</p>

    return (
        <AllApprovedLeaves substitutes={res.substitutes} employees={res.employees} leaves={leaves} />
    )
}

export default page