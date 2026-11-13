"use client";

import { Map } from "lucide-react";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function RoadmapCard() {
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
      <div className="flex items-center gap-3">

        <Map className="text-cyan-400" />

        <h2 className="text-2xl font-bold">
          AI Career Roadmap
        </h2>

      </div>

      <div className="mt-8 space-y-5">

        {data.roadmap.length === 0 ? (
          <p className="text-zinc-400">
            Upload a resume to generate your roadmap.
          </p>
        ) : (
          data.roadmap.map((step, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-cyan-500/20
                bg-cyan-500/5
                p-5
              "
            >
              <span className="font-semibold text-cyan-400">
                Step {index + 1}
              </span>

              <p className="mt-2 text-zinc-300">
                {step}
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  );
}