"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Background Glow */}

      <div
        className="
          fixed
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_top,#00E5FF18,transparent_35%),radial-gradient(circle_at_bottom_right,#7C3AED18,transparent_35%)]
        "
      />

      {/* Grid */}

      <div
        className="
          fixed
          inset-0
          -z-10
          opacity-[0.05]
          bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="ml-[300px] min-h-screen">

  <Topbar />

  <motion.main
    initial={{
      opacity: 0,
      x: 20,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      duration: 0.6,
    }}
    className="px-10 pb-10"
  >
    {children}
  </motion.main>

</div>

    </div>
  );
}