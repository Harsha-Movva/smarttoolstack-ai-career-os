"use client";

import {
  Target,
  Briefcase,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { useDashboard } from "@/lib/context/DashboardContext";

export default function StatsGrid() {
  const { data } = useDashboard();

  const cards = [
    {
      title: "ATS Score",
      value: `${data.atsScore}%`,
      icon: Target,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Career",
      value: data.career || "--",
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Skills",
      value: data.skills.length,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Missing",
      value: data.missingSkills.length,
      icon: Sparkles,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-6
            "
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center`}
            >
              <Icon className="text-white" size={24} />
            </div>

            <p className="mt-5 text-zinc-400">
              {card.title}
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}