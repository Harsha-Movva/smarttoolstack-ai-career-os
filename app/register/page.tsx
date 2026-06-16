"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async () => {

    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    if (name.trim().length < 3) {
      alert(
        "Name must be at least 3 characters"
      );
      return;
    }

    if (!email.trim()) {
      alert("Enter your email");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert(
        "Enter a valid email address"
      );
      return;
    }

    if (!password.trim()) {
      alert("Enter your password");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (
      !passwordRegex.test(password)
    ) {
      alert(
        "Password must contain uppercase, lowercase, number, special character and be at least 8 characters"
      );
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration Successful"
      );

      router.push("/login");

    } catch (error: any) {

      alert(
        error?.response?.data?.detail ||
        "Registration failed"
      );

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-[450px]">

        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-zinc-400 mt-2">
          Join SmartToolStack
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
          onClick={handleRegister}
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
            ? "Creating Account..."
            : "Register"}
        </button>

        <p className="text-zinc-400 text-center mt-6">
          Already have an account?
        </p>

        <button
          onClick={() =>
            router.push("/login")
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
          Login
        </button>

      </div>

    </div>
  );
}