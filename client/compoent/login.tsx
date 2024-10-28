"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import "./nav.css";

const LoginForm: React.FC = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  console.log(password);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      // Call login with two arguments
      login(data.email, data.password);
      
      if (data) {
        router.push("/product");
      }
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100 log-width">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[100%]"
      >
        <h2 className="text-lg font-semibold mb-4 text-center  de-h2">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Email
          </label>
          <br className="my-2" />
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
