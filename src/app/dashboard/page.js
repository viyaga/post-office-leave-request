import { redirect } from "next/navigation"

const page = () => {
  redirect('/dashboard/data-page')
  return (
    <div>page</div>
  )
}

export default page