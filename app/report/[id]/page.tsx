"use client";

import {
  useEffect,
  useState
} from "react";

type Report = {
  id: number;
  user_id: number;
  ats_score: string;
  career: string;
  skills: string[];
  missing_skills: string[];
  roadmap: string[];
  created_at: string;
};

export default function ReportPage() {
  const [report, setReport] =
    useState<Report | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const path =
          window.location.pathname;

        const reportId =
          path.split("/").pop();

        const response =
          await fetch(
            `http://127.0.0.1:8000/report/${reportId}`
          );

        const data = await response.json();

console.log(data);

setReport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Loading report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Report not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <button
        onClick={() =>
          window.location.href =
            "/reports"
        }
        className="
          mb-8
          px-5
          py-3
          rounded-xl
          bg-zinc-800
          hover:bg-zinc-700
        "
      >
        ← Back to Reports
      </button>

      <div
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
        "
      >

        <div className="flex justify-between items-center">

          <div>

            <h1
              className="
                text-5xl
                font-bold
                text-white
              "
            >
              {report.career}
            </h1>

            <p className="text-zinc-400 mt-3">
              {new Date(
                report.created_at
              ).toLocaleString()}
            </p>

          </div>

          <div
            className="
              w-28
              h-28
              rounded-full
              bg-cyan-500/20
              border
              border-cyan-500
              flex
              items-center
              justify-center
            "
          >
            <span
              className="
                text-4xl
                font-bold
                text-cyan-400
              "
            >
              {report.ats_score}
            </span>
          </div>

        </div>

        <div className="mt-10">

          <h2
            className="
              text-green-400
              font-bold
              text-2xl
            "
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-4">

            {(
  typeof report.skills === "string"
    ? report.skills.split(",")
    : report.skills || []
).map(
  (skill: string, index: number) => (
    <span
      key={index}
      className="
        px-4
        py-2
        rounded-xl
        bg-zinc-800
        border
        border-green-500
      "
    >
      {skill.trim()}
    </span>
  )
)}
          </div>

        </div>

        <div className="mt-10">

          <h2
            className="
              text-red-400
              font-bold
              text-2xl
            "
          >
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-4">

            {(
  typeof report.missing_skills === "string"
    ? report.missing_skills.split(",")
    : report.missing_skills || []
).map(
  (skill: string, index: number) => (
    <span
      key={index}
      className="
        px-4
        py-2
        rounded-xl
        bg-zinc-800
        border
        border-red-500
      "
    >
      {skill.trim()}
    </span>
  )
)}

          </div>

        </div>

        <div className="mt-10">

          <h2
            className="
              text-cyan-400
              font-bold
              text-2xl
            "
          >
            Learning Roadmap
          </h2>

          <ul className="mt-4 space-y-3">

  {(
  typeof report.roadmap === "string"
    ? report.roadmap.split(",")
    : report.roadmap || []
).map(
  (step: string, index: number) => (
    <li
      key={index}
      className="
        bg-zinc-800
        p-4
        rounded-xl
      "
    >
      {index + 1}. {step.trim()}
    </li>
  )
)}

</ul>

        </div>

      </div>

    </div>
  );
}