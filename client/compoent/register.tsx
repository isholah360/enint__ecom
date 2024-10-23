'use client'

import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from "next/navigation";


const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      const data = await response.json();
      console.log(data.email)

      if (data) {
        router.push("/login");
      }
      console.log("register successful:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100 log-width">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[100%]"
      >
        <h2 className="text-lg font-semibold mb-4 text-center  de-h2">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Email
          </label>
          <br className="my-2" />
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded input-wid"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <br />
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded input-wid"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 login-buton"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
