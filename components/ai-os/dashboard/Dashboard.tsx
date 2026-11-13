"use client";

import Hero from "../hero/Hero";
import StatsGrid from "./StatsGrid";
import ResumeUploadCard from "./ResumeUploadCard";
import InsightsCard from "./InsightsCard";
import RoadmapCard from "./RoadmapCard";
import ReportsCard from "./ReportsCard";
import AssistantCard from "./AssistantCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <Hero />

      <StatsGrid />

      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-7">
          <ResumeUploadCard />
        </div>

        <div className="col-span-5">
          <InsightsCard />
        </div>

      </div>

      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-7">
          <RoadmapCard />
        </div>

        <div className="col-span-5">
          <ReportsCard />
        </div>

      </div>

      <AssistantCard />

    </div>
  );
}