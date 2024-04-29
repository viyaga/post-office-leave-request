import AllApprovedLeaves from "@/components/dashboard/allApprovedLeaves/AllApprovedLeaves"

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

const page = () => {
    return (
        <AllApprovedLeaves />
    )
}

export default page