"use client"

import React, { useState } from 'react'
import './login-register.scss'
import { registerUser, loginUser } from '@/lib/actions'

import RegisterForm from './registerForm/RegisterForm'
import LoginForm from './loginForm/LoginForm'

const LoginRegister = () => {

	return (
		<div className="signin-signup">
			<div className='wrapper'>
				<RegisterForm />
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginRegister