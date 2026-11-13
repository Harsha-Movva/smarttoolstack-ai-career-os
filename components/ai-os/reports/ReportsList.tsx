"use client";
import { API_BASE_URL } from "@/lib/api/config";

import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";

type Report = {
  id: number;
  ats_score: number;
  career: string;
  skills: string[];
  created_at: string;
};

export default function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.id) {
      setLoading(false);
      return;
    }

    fetch(
      `${API_BASE_URL}/reports/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <p className="text-zinc-400">
        Loading reports...
      </p>
    );
  }

  if (reports.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-zinc-700
          p-12
          text-center
        "
      >
        <h2 className="text-2xl text-white font-bold">
          No Reports Yet
        </h2>

        <p className="text-zinc-500 mt-3">
          Upload a resume to generate your first AI report.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          id={report.id}
          atsScore={report.ats_score}
          career={report.career}
          date={new Date(
            report.created_at
          ).toLocaleDateString()}
          skills={report.skills}
        />
      ))}
    </div>
  );
}