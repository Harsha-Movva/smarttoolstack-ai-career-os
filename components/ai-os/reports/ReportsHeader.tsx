"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function ReportsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-10"
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <FileText className="text-cyan-400" size={28} />
          </div>

          <div>
            <h1 className="text-4xl font-black text-white">
              Reports
            </h1>

            <p className="text-zinc-400 mt-1">
              View, download and track all AI resume analyses.
            </p>
          </div>
        </div>
      </div>

      <button
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          hover:scale-105
          transition
        "
      >
        <Download size={18} />
        Export Reports
      </button>
    </motion.div>
  );
}