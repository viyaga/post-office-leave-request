"use client"

import React, { useTransition } from 'react'
import toast from 'react-hot-toast'
// import { registerUser } from '@/lib/actions'

const AdminLogin = () => {
    const [isPending, startTransition] = useTransition()
    const onRegister = (formData) => {
        const { email, password, cpassword } = Object.fromEntries(formData)
        if (!email || !password || !cpassword) return toast.error("Please enter the required field")
        if (password !== cpassword) return toast.error("Password not matching")

        startTransition(async () => {
            const register = await registerUser(email, password)

            if (register?.error) {
                toast.error(register.error)
            } else {
                toast.success(register?.success)
                const wrapper = document.querySelector(".wrapper")
                const form = document.getElementById("register")
                wrapper.classList.add("active")
                form.reset()
            }
        })
    }

    const changeSignUp = () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.classList.remove("active");

    }

    return (
        <div className="form signup">
            <header onClick={changeSignUp}>Admin</header>
            <form action={onRegister} id='register'>
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name='password' placeholder="Password" />
                <input type="text" name='cpassword' placeholder="Sub Division Name" />
                <div className="checkbox">
                    <input type="checkbox" id="signupCheck" />
                    <label htmlFor="signupCheck">I accept all terms &amp; conditions</label>
                </div>
                <input type="submit" defaultValue={isPending ? "Loading..." : "Login"} />
            </form>
        </div>
    )
}

export default AdminLogin