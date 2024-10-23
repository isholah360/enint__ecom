'use client'

import { NextPage } from 'next'
import RegisterForm from '../../compoent/register'

const Register: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <RegisterForm />
    </div>
  )
}

export default Register
