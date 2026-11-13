"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import { useDashboard } from "@/lib/context/DashboardContext";

export default function InsightsCard() {
  const { data } = useDashboard();

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-8
      "
    >
      <h2 className="text-2xl font-bold">
        AI Insights
      </h2>

      <div className="mt-8 space-y-6">

        <div>

          <div className="flex items-center gap-2 text-green-400">

            <CheckCircle2 size={18} />

            Strengths

          </div>

          <ul className="mt-3 space-y-2 text-zinc-300">

            {data.strengths.length === 0 ? (
              <li>No analysis yet.</li>
            ) : (
              data.strengths.map((item, index) => (
                <li key={index}>• {item}</li>
              ))
            )}

          </ul>

        </div>

        <div>

          <div className="flex items-center gap-2 text-orange-400">

            <AlertTriangle size={18} />

            Weaknesses

          </div>

          <ul className="mt-3 space-y-2 text-zinc-300">

            {data.weaknesses.length === 0 ? (
              <li>No analysis yet.</li>
            ) : (
              data.weaknesses.map((item, index) => (
                <li key={index}>• {item}</li>
              ))
            )}

          </ul>

        </div>

        <div>

          <div className="flex items-center gap-2 text-cyan-400">

            <Lightbulb size={18} />

            Suggestions

          </div>

          <ul className="mt-3 space-y-2 text-zinc-300">

            {data.suggestions.length === 0 ? (
              <li>No suggestions yet.</li>
            ) : (
              data.suggestions.map((item, index) => (
                <li key={index}>• {item}</li>
              ))
            )}

          </ul>

        </div>

      </div>
    </div>
  );
}