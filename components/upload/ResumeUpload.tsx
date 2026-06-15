"use client";

import { useState } from "react";
import axios from "axios";

type Props = {
  onAnalysisComplete: (
    score: number,
    skills: string[],
    missingSkills: string[],
    career: string,
    roadmap: string[],
    strengths: string[],
    weaknesses: string[],
    suggestions: string[]
  ) => void;
};

export default function ResumeUpload({
  onAnalysisComplete,
}: Props) {
  const [fileName, setFileName] =
    useState("");

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      onAnalysisComplete(
        response.data.ats_score,
        response.data.skills,
        response.data.missing_skills,
        response.data.career,
        response.data.roadmap,
        response.data.strengths,
        response.data.weaknesses,
        response.data.suggestions
      );

    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

        <h2 className="text-2xl font-bold text-white">
          Resume Analysis
        </h2>

        <p className="text-zinc-400 mt-2">
          Upload your resume to generate ATS score,
          skill analysis and career insights.
        </p>

        <div className="mt-6 border-2 border-dashed border-zinc-700 rounded-2xl p-16 text-center">

          <p className="text-zinc-400">
            Drag & Drop PDF Resume
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="resumeUpload"
          />

          <label
            htmlFor="resumeUpload"
            className="
              inline-block
              mt-6
              px-6
              py-3
              rounded-xl
              bg-white
              text-black
              font-semibold
              cursor-pointer
              hover:bg-zinc-200
              transition
            "
          >
            Choose File
          </label>

          {fileName && (
            <p className="mt-4 text-green-400">
              Selected: {fileName}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}