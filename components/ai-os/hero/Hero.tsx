"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  Wand2,
  ArrowRight,
} from "lucide-react";

import AIOrb from "@/components/ai-os/orb/AIOrb";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-3xl
        p-12
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -top-32
          right-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-cyan-500/10
          blur-[140px]
        "
      />

      <div
        className="
          relative
          z-10
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        {/* LEFT SIDE */}

        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-500/10
              px-5
              py-2
              text-cyan-300
              text-sm
            "
          >
            <Sparkles size={16} />

            AI Career Operating System
          </div>

          <h1
            className="
              mt-8
              text-6xl
              font-black
              leading-tight
            "
          >
            Welcome Back,

            <span
              className="
                block
                mt-2
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              Harsha 👋
            </span>
          </h1>

          <p
            className="
              mt-8
              max-w-xl
              text-lg
              leading-8
              text-zinc-400
            "
          >
            Build resumes, improve ATS scores,
            prepare interviews and accelerate
            your career using AI.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex gap-5 flex-wrap">

            <button
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-8
                py-4
                text-white
                font-semibold
                shadow-xl
                hover:scale-105
                transition
              "
            >
              <Upload size={20} />

              Upload Resume
            </button>

            <button
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                font-semibold
                hover:bg-white/10
                transition
              "
            >
              <Wand2 size={20} />

              AI Resume Builder

              <ArrowRight size={18} />
            </button>

          </div>

          {/* Quick Stats */}

          <div
            className="
              mt-12
              grid
              grid-cols-2
              gap-4
            "
          >

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-zinc-400 text-sm">
                ATS Score
              </p>

              <h2 className="mt-2 text-3xl font-bold text-cyan-400">
                92%
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-zinc-400 text-sm">
                Reports
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-400">
                12
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-zinc-400 text-sm">
                Job Matches
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-400">
                128
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-zinc-400 text-sm">
                AI Readiness
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                94%
              </h2>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          className="
            flex
            items-center
            justify-center
          "
        >
          <AIOrb />
        </div>

      </div>

    </motion.section>
  );
}