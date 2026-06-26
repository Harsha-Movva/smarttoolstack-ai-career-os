"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BrainCircuit,
  GraduationCap,
  Target,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  {
    title: "Dashboard",
    href: "/ai-os",
    icon: LayoutDashboard,
  },
  {
    title: "My Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Resume Builder",
    href: "/resume-builder",
    icon: Briefcase,
  },
  {
    title: "Career Coach",
    href: "/career-coach",
    icon: BrainCircuit,
  },
  {
    title: "Interview",
    href: "/interview",
    icon: GraduationCap,
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    icon: Target,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-[300px]
      border-r
      border-white/10
      bg-white/5
      backdrop-blur-3xl
      flex
      flex-col
      justify-between
      z-50
    "
    >
      {/* Logo */}

      <div>

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            px-8
            py-8
            border-b
            border-white/10
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-purple-500
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Sparkles
                className="text-white"
                size={28}
              />
            </div>

            <div>

              <h1 className="text-white text-2xl font-bold">
                SmartToolStack
              </h1>

              <p className="text-cyan-400 text-sm">
                AI Career OS
              </p>

            </div>

          </div>

        </motion.div>

        {/* Menu */}

        <nav className="mt-8 px-5 space-y-3">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.title}
                href={item.href}
              >

                <motion.div
                  whileHover={{
                    x: 8,
                  }}
                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    px-5
                    py-4
                    transition
                    duration-300

                    ${
                      active
                        ? "bg-cyan-500/15 border border-cyan-400/40"
                        : "hover:bg-white/5"
                    }
                  `}
                >

                  <div className="flex items-center gap-4">

                    <Icon
                      size={22}
                      className={
                        active
                          ? "text-cyan-400"
                          : "text-zinc-400"
                      }
                    />

                    <span
                      className={
                        active
                          ? "text-white font-semibold"
                          : "text-zinc-400"
                      }
                    >
                      {item.title}
                    </span>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-zinc-500"
                  />

                </motion.div>

              </Link>

            );

          })}

        </nav>

      </div>

      {/* Bottom */}

      <div
        className="
          p-6
          border-t
          border-white/10
        "
      >

        <div
          className="
            rounded-3xl
            bg-gradient-to-br
            from-cyan-500/10
            to-purple-500/10
            border
            border-white/10
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-white font-semibold">
                AI Status
              </p>

              <p className="text-green-400 text-sm">
                Online
              </p>

            </div>

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-green-400
                animate-pulse
              "
            />

          </div>

          <button
            onClick={logout}
            className="
              mt-6
              w-full
              rounded-2xl
              bg-red-500
              py-3
              font-semibold
              text-white
              hover:bg-red-400
              transition
            "
          >
            <div className="flex justify-center items-center gap-2">

              <LogOut size={18} />

              Logout

            </div>

          </button>

        </div>

      </div>

    </aside>
  );
}