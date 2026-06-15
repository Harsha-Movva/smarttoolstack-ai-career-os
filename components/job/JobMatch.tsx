"use client";

import { useState } from "react";
import axios from "axios";

type Props = {
  skills: string[];
};

export default function JobMatch({
  skills,
}: Props) {
  const [jobDescription, setJobDescription] =
    useState("");

  const [score, setScore] =
    useState<number | null>(null);

  const [matched, setMatched] =
    useState<string[]>([]);

  const [missing, setMissing] =
    useState<string[]>([]);

  const analyzeMatch = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/job-match",
        {
          skills,
          job_description: jobDescription,
        }
      );

      setScore(response.data.score);
      setMatched(response.data.matched);
      setMissing(response.data.missing);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

      <h2 className="text-xl font-bold text-white">
        Job Match Analyzer
      </h2>

      <textarea
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
        placeholder="Paste Job Description Here..."
        className="w-full mt-4 h-40 bg-black border border-zinc-700 rounded-xl p-4 text-white"
      />

      <button
        onClick={analyzeMatch}
        className="mt-4 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold"
      >
        Analyze Match
      </button>

      {score !== null && (
        <div className="mt-6">

          <h3 className="text-3xl text-cyan-400">
            Match Score: {score}%
          </h3>

          <div className="mt-6">
            <h4 className="text-green-400 font-bold">
              Matching Skills
            </h4>

            <ul className="mt-2">
              {matched.map((skill, index) => (
                <li key={index}>
                  ✓ {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-red-400 font-bold">
              Missing Skills
            </h4>

            <ul className="mt-2">
              {missing.map((skill, index) => (
                <li key={index}>
                  ✗ {skill}
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}