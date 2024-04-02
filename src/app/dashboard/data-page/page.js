import DataPage from "@/components/dashboard/dataPage/dataPage"

const page = ({ searchParams }) => {
  const type = searchParams?.type || "leave"
  const cat = searchParams?.cat || "pending"

  return (
    <DataPage type={type} category={cat} />
  )
}

export default page