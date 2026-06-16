"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    if (!email.trim()) {
      alert("Enter your email");
      return;
    }

    if (!password.trim()) {
      alert("Enter your password");
      return;
    }

    try {

      setLoading(true);

      const response =
        await axios.post(
          "http://127.0.0.1:8000/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      alert(
        "Login successful"
      );

      router.push("/");

    } catch (error: any) {

      alert(
        error?.response?.data?.detail ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-[450px]">

        <h1 className="text-3xl font-bold text-white">
          Login
        </h1>

        <p className="text-zinc-400 mt-2">
          Sign in to SmartToolStack
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            mt-6
            p-3
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            text-white
            outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            mt-4
            p-3
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            text-white
            outline-none
          "
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            mt-6
            p-3
            rounded-xl
            bg-cyan-500
            text-black
            font-bold
            hover:bg-cyan-400
            disabled:opacity-50
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="text-zinc-400 text-center mt-6">
          Don't have an account?
        </p>

        <button
          onClick={() =>
            router.push("/register")
          }
          className="
            w-full
            mt-3
            p-3
            rounded-xl
            border
            border-zinc-700
            text-white
          "
        >
          Create Account
        </button>

      </div>

    </div>
  );
}