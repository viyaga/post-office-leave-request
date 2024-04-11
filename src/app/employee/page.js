import { auth } from "@/auth";

const page = async() => {
  const au = await auth()
  console.log({user: au?.user, aadmin: au?.admin});
  return (
    <div>page</div>
  )
}

export default page