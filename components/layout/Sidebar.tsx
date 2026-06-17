"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-zinc-900
        border-r
        border-zinc-800
      "
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          SmartToolStack
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          AI Career OS
        </p>
      </div>

      <nav className="px-4 flex flex-col gap-4">

        <Link
          href="/"
          className="
            block
            px-4
            py-3
            rounded-xl
            text-zinc-300
            hover:bg-zinc-800
            hover:text-cyan-400
            transition
          "
        >
          📊 Dashboard
        </Link>

        <Link
          href="/reports"
          className="
            block
            px-4
            py-3
            rounded-xl
            text-zinc-300
            hover:bg-zinc-800
            hover:text-cyan-400
            transition
          "
        >
          📄 My Reports
        </Link>

        <div
          className="
            px-4
            py-3
            rounded-xl
            text-zinc-500
          "
        >
          📑 Resume Analyzer
        </div>

        <div
          className="
            px-4
            py-3
            rounded-xl
            text-zinc-500
          "
        >
          🛣️ Career Roadmap
        </div>

        <div
          className="
            px-4
            py-3
            rounded-xl
            text-zinc-500
          "
        >
          🎤 Interview Copilot
        </div>

      </nav>
    </aside>
  );
}