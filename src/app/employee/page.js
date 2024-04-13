import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const au = await auth()

  if (au?.user?.isAdmin) {
    redirect('/dashboard')
  }

  return (
    <div>page</div>
  )
}

export default page