"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Target,
  Trophy,
  Briefcase,
} from "lucide-react";

const stats = [
  {
    title: "Total Reports",
    value: "24",
    icon: FileText,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Average ATS",
    value: "91%",
    icon: Target,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Best ATS",
    value: "98%",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Career Matches",
    value: "12",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
  },
];

export default function ReportsStats() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
            }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <div
              className={`
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-r
                ${item.color}
                flex
                items-center
                justify-center
                mb-5
              `}
            >
              <Icon className="text-white" size={24} />
            </div>

            <p className="text-zinc-400">
              {item.title}
            </p>

            <h2 className="mt-2 text-4xl font-black text-white">
              {item.value}
            </h2>
          </motion.div>
        );
      })}
    </div>
  );
}