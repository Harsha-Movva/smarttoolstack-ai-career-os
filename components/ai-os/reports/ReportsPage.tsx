"use client";

import ReportsHeader from "./ReportsHeader";
import ReportsStats from "./ReportsStats";
import ReportsList from "./ReportsList";
export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <ReportsHeader />

      <ReportsStats />

      <div
  className="
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    p-8
  "
>
  <h2 className="text-3xl font-bold text-white mb-8">
    Resume Analysis History
  </h2>

  <ReportsList />
</div>
    </div>
  );
}