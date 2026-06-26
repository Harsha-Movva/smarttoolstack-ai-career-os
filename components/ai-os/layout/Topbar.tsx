"use client";

import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Moon,
  Sparkles,
} from "lucide-react";

export default function Topbar() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        mb-8
        flex
        items-center
        justify-between
      "
    >
      {/* Search */}

      <div
        className="
          flex
          items-center
          gap-3
          w-[500px]
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          py-4
          backdrop-blur-xl
        "
      >
        <Search
          size={20}
          className="text-zinc-500"
        />

        <input
          type="text"
          placeholder="Ask SmartToolStack AI..."
          className="
            w-full
            bg-transparent
            outline-none
            text-white
            placeholder:text-zinc-500
          "
        />
      </div>

      {/* Right Side */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <button
          className="
            h-12
            w-12
            rounded-2xl
            border
            border-white/10
            bg-white/5
            flex
            items-center
            justify-center
            hover:bg-cyan-500/20
            transition
          "
        >
          <Sparkles
            size={20}
            className="text-cyan-400"
          />
        </button>

        <button
          className="
            relative
            h-12
            w-12
            rounded-2xl
            border
            border-white/10
            bg-white/5
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              right-3
              top-3
              h-2.5
              w-2.5
              rounded-full
              bg-cyan-400
            "
          />
        </button>

        <button
          className="
            h-12
            w-12
            rounded-2xl
            border
            border-white/10
            bg-white/5
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition
          "
        >
          <Moon size={20} />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
          "
        >
          <div
            className="
              h-11
              w-11
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              flex
              items-center
              justify-center
              text-lg
              font-bold
            "
          >
            H
          </div>

          <div>
            <p className="font-semibold">
              Harsha
            </p>

            <p className="text-xs text-zinc-400">
              AI Pro Member
            </p>
          </div>
        </div>

      </div>

    </motion.header>
  );
}