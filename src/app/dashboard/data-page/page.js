import DataPage from "@/components/dashboard/shared/dataPage/DataPage"

const page = async ({ searchParams }) => {

  const type = searchParams?.type || "leaves"
  const cat = searchParams?.cat || "pending"

  return (
    <DataPage type={type} category={cat} />
  )
}

export default page
