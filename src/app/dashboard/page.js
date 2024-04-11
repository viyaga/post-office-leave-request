import { auth } from "@/auth"
import DataPage from "@/components/dashboard/dataPage/DataPage"
const getData = async (type, category) => {
  const SERVER_ONE = process.env.SERVER_ONE
  try {
    const response = await axios.get(`${SERVER_ONE}/${type}/${category}`)
    const data = response.data
    return { data: data[type] }
  } catch (error) {
    return { error: errResponse(error) }
  }
}

const page = async ({ searchParams }) => {
  const au = await auth()

  if (!(au?.user?.isAdmin)) {
    redirect('/employee')
  }

  const type = searchParams?.type || "leaves"
  const cat = searchParams?.cat || "pending"

  return (
    <DataPage type={type} category={cat} />
  )
}

export default page
