import { auth } from '@/auth'
import Login from '@/components/login/Login'
import { redirect } from 'next/navigation'

const page = async () => {

  const au = await auth()

  if (au?.user?.isAdmin) {
    redirect('/dashboard')
  } else if (au?.user) {
    redirect('/employee')
  }

  return (
    <Login />
  )
}

export default page