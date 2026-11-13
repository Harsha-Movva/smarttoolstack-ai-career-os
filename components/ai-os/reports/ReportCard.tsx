"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

type ReportCardProps = {
  id?: number;
  atsScore: number;
  career: string;
  date: string;
  skills: string[];
};

export default function ReportCard({
  id,
  atsScore,
  career,
  date,
  skills,
}: ReportCardProps) {
  const scoreStyle =
    atsScore >= 90
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : atsScore >= 70
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";

  const match =
    atsScore >= 90
      ? "★★★★★ Excellent Match"
      : atsScore >= 80
      ? "★★★★ Strong Match"
      : atsScore >= 70
      ? "★★★ Good Match"
      : "★★ Needs Improvement";

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{ duration: 0.25 }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
        hover:border-cyan-400/40
        hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]
        transition-all
      "
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div
            className={`
              h-16
              w-16
              rounded-2xl
              border
              flex
              flex-col
              items-center
              justify-center
              font-black
              ${scoreStyle}
            `}
          >
            <span className="text-[10px] uppercase tracking-wider">
              ATS
            </span>

            <span className="text-2xl">
              {atsScore}
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              {career}
            </h2>

            <p className="mt-1 text-cyan-400 font-medium">
              {match}
            </p>

            <div className="mt-2 flex items-center gap-2 text-zinc-400">
              <Calendar size={15} />
              <span>{date}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (id) {
              window.location.href = `/report/${id}`;
            }
          }}
          className="
            flex
            items-center
            gap-2
            h-fit
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            font-bold
            text-black
            transition
            hover:bg-cyan-400
          "
        >
          View Report
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              rounded-full
              border
              border-cyan-500/30
              bg-cyan-500/10
              px-4
              py-2
              text-cyan-300
              transition
              hover:scale-105
              hover:bg-cyan-500/20
              cursor-default
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}