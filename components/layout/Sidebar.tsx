"use client";

import Link from "next/link";

export default function Sidebar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside
      className="
        w-80
        min-h-screen
        bg-gradient-to-b
        from-zinc-950
        via-zinc-900
        to-black
        border-r
        border-zinc-800
        flex
        flex-col
      "
    >
      {/* Logo */}
      <div>
        <div className="p-8 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-cyan-500
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              ⚡
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                SmartToolStack
              </h1>

              <p className="text-cyan-400 text-sm">
                AI Career Operating System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-5 space-y-2">
          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-zinc-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
              transition
            "
          >
            📊 Dashboard
          </Link>

          <Link
            href="/reports"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-zinc-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
              transition
            "
          >
            📄 My Reports
          </Link>

          <Link
            href="/resume-builder"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-zinc-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
              transition
            "
          >
            📝 AI Resume Builder
          </Link>

          <Link
            href="/cover-letter"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-zinc-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
              transition
            "
          >
            ✉️ Cover Letter
          </Link>

          <Link
            href="/interview"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-zinc-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
              transition
            "
          >
            🎤 Interview Copilot
          </Link>

          <Link
            href="/career-coach"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-zinc-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
              transition
            "
          >
            🧠 AI Career Coach
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 border-t border-zinc-800">

  <div className="flex items-center gap-3 mb-5">

    <div
      className="
        w-12
        h-12
        rounded-full
        bg-cyan-500
        flex
        items-center
        justify-center
        text-xl
        font-bold
        text-black
      "
    >
      H
    </div>

    <div>

      <p className="text-white font-semibold">
        Harsha
      </p>

      <p className="text-zinc-500 text-sm">
        Student Plan
      </p>

    </div>

  </div>

  <button
    onClick={logout}
    className="
      w-full
      h-12
      rounded-xl
      bg-red-500
      hover:bg-red-400
      transition
      text-white
      font-semibold
    "
  >
    Logout
  </button>

</div>
    </aside>
  );
}