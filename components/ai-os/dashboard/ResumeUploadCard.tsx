"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

import { uploadResume } from "@/lib/api/resume";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function ResumeUploadCard() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setData } = useDashboard();

  const [loading, setLoading] = useState(false);

  const [uploadedFile, setUploadedFile] =
    useState("");

  async function handleFile(file: File) {
    try {
      setLoading(true);

      const result = await uploadResume(file);

      setData({
        atsScore: result.ats_score,
        skills: result.skills,
        missingSkills: result.missing_skills,
        career: result.career,
        roadmap: result.roadmap,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        suggestions: result.suggestions,
      });

      setUploadedFile(file.name);
    } catch (err) {
      console.error(err);
      alert("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-cyan-500/10
        via-[#0B1224]
        to-[#111827]
        p-8
      "
    >
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/20 p-3">
            <Upload
              className="text-cyan-400"
              size={26}
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Resume Analyzer
            </h2>

            <p className="text-zinc-400">
              Upload your latest resume
            </p>

          </div>

        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="
            mt-8
            cursor-pointer
            rounded-3xl
            border-2
            border-dashed
            border-cyan-500/30
            p-12
            text-center
            transition
            hover:border-cyan-400
            hover:bg-cyan-500/5
          "
        >
          {loading ? (
            <>
              <Loader2
                className="mx-auto animate-spin text-cyan-400"
                size={48}
              />

              <h3 className="mt-5 text-xl font-semibold">
                AI is analyzing your resume...
              </h3>

              <p className="mt-2 text-zinc-400">
                Please wait
              </p>
            </>
          ) : uploadedFile ? (
            <>
              <CheckCircle2
                className="mx-auto text-green-400"
                size={50}
              />

              <h3 className="mt-5 text-xl font-semibold">
                Upload Successful
              </h3>

              <p className="mt-2 text-green-400">
                {uploadedFile}
              </p>
            </>
          ) : (
            <>
              <FileText
                className="mx-auto text-cyan-400"
                size={50}
              />

              <h3 className="mt-5 text-xl font-semibold">
                Click to Upload Resume
              </h3>

              <p className="mt-2 text-zinc-400">
                PDF • DOC • DOCX
              </p>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />

        <div className="mt-8 flex items-center justify-between">

          <div className="flex items-center gap-2 text-cyan-400">

            <Sparkles size={18} />

            Gemini AI Analysis

          </div>

          <div className="text-zinc-500">
            Avg. 4–6 sec
          </div>

        </div>

      </div>

    </motion.div>
  );
}