import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const au = await auth()

  if (au?.user?.isAdmin) {
    redirect('/dashboard')
  } 

  console.log({employee: au.user});
  return (
    <div>page</div>
  )
}

export default page