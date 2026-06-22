"use client";

import { useState } from "react";

export default function CareerCoachPage() {

  const [skills, setSkills] =
    useState("");

  const [advice, setAdvice] =
    useState("");

  const generateAdvice =
    async () => {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:8000/career-coach",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                ats_score: 70,
                interview_score: 7,
                skills,
              }),
            }
          );

        const data =
          await response.json();

        setAdvice(
          data.advice
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold">
        AI Career Coach
      </h1>

      <textarea
        rows={6}
        placeholder="Skills..."
        value={skills}
        onChange={(e) =>
          setSkills(
            e.target.value
          )
        }
        className="
          w-full
          mt-6
          p-4
          rounded-xl
          bg-zinc-800
        "
      />

      <button
        onClick={generateAdvice}
        className="
          mt-6
          px-6
          py-3
          rounded-xl
          bg-cyan-500
          text-black
          font-bold
        "
      >
        Generate Advice
      </button>

      {advice && (
        <div
          className="
            mt-8
            bg-zinc-800
            p-6
            rounded-xl
            whitespace-pre-wrap
          "
        >
          {advice}
        </div>
      )}

    </div>
  );
}