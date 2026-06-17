"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

type Report = {
  id: number;
  ats_score: string;
  career: string;
  skills: string[];
  missing_skills: string[];
  roadmap: string[];
  created_at: string;
};

export default function ReportsPage() {
  const [reports, setReports] =
    useState<Report[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.id) {
      window.location.href =
        "/login";
      return;
    }

    fetch(
      `http://127.0.0.1:8000/reports/${user.id}`
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

  return (
    <div className="flex min-h-screen bg-black">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-5xl font-bold text-white">
              My Reports
            </h1>

            <p className="text-zinc-400 mt-2">
              View all your saved resume analyses
            </p>
          </div>

          <div
            className="
              px-6
              py-3
              rounded-2xl
              bg-zinc-900
              border
              border-zinc-800
            "
          >
            <span className="text-zinc-400">
              Total Reports
            </span>

            <div className="text-3xl font-bold text-cyan-400">
              {reports.length}
            </div>
          </div>

        </div>

        {loading ? (

          <div className="text-zinc-400">
            Loading reports...
          </div>

        ) : reports.length === 0 ? (

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-10
            "
          >
            <p className="text-zinc-400">
              No reports found.
            </p>
          </div>

        ) : (

          <div className="space-y-6">

            {reports.map((report) => (

              <div
                key={report.id}
                className="
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-3xl
                  p-8
                  hover:border-cyan-500
                  transition
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                  "
                >

                  <div>

                    <h2
                      className="
                        text-3xl
                        font-bold
                        text-white
                      "
                    >
                      {report.career}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                      {new Date(
                        report.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div
                    className="
                      w-24
                      h-24
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

                <div className="mt-8">

                  <h3 className="text-green-400 font-bold text-lg">
                    Skills
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-4">

                    {report.skills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="
                            px-4
                            py-2
                            rounded-xl
                            bg-zinc-800
                            border
                            border-green-500
                            text-white
                          "
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                </div>

                <div className="mt-8">

                  <h3 className="text-red-400 font-bold text-lg">
                    Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-4">

                    {report.missing_skills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="
                            px-4
                            py-2
                            rounded-xl
                            bg-zinc-800
                            border
                            border-red-500
                            text-white
                          "
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                </div>

                <div className="mt-8">

                  <h3 className="text-cyan-400 font-bold text-lg">
                    Learning Roadmap
                  </h3>

                  <ul className="mt-4 space-y-2">

                    {report.roadmap.map(
                      (step, index) => (
                        <li
                          key={index}
                          className="text-zinc-300"
                        >
                          {index + 1}. {step}
                        </li>
                      )
                    )}

                  </ul>

                </div>
                <div className="mt-8">

  <button
    onClick={() =>
      window.location.href =
        `/report/${report.id}`
    }
    className="
      px-5
      py-3
      rounded-xl
      bg-cyan-500
      text-black
      font-bold
      hover:bg-cyan-400
      transition
    "
  >
    View Details
  </button>

</div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}