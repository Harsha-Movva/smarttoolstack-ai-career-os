"use client";

import {
  useState,
  useEffect
} from "react";

import Sidebar from "@/components/layout/Sidebar";
import ATSCard from "@/components/cards/ATSCard";
import SkillGapCard from "@/components/cards/SkillGapCard";
import CareerScoreCard from "@/components/cards/CareerScoreCard";
import ResumeUpload from "@/components/upload/ResumeUpload";
import RoadmapCard from "@/components/cards/RoadmapCard";
import JobMatch from "@/components/job/JobMatch";
import ReportsCard from "@/components/cards/ReportsCard";
export default function Home() {
  const [userName, setUserName] =
  useState("");
  const [totalReports, setTotalReports] =
  useState(0);
  const [atsScore, setAtsScore] =
    useState(0);

  const [skills, setSkills] =
    useState<string[]>([]);

  const [missingSkills, setMissingSkills] =
    useState<string[]>([]);

  const [career, setCareer] =
    useState("");

  const [roadmap, setRoadmap] =
    useState<string[]>([]);

  const [strengths, setStrengths] =
    useState<string[]>([]);

  const [weaknesses, setWeaknesses] =
    useState<string[]>([]);

  const [suggestions, setSuggestions] =
    useState<string[]>([]);

  const [reportLoading, setReportLoading] =
    useState(false);

  const handleAnalysisComplete = (
    score: number,
    foundSkills: string[],
    missing: string[],
    careerRole: string,
    roadmapItems: string[],
    strengthsData: string[],
    weaknessesData: string[],
    suggestionsData: string[]
  ) => {
    setAtsScore(score);
    setTotalReports(1);

    setSkills(foundSkills);

    setMissingSkills(missing);

    setCareer(careerRole);

    setRoadmap(roadmapItems);

    setStrengths(strengthsData);

    setWeaknesses(weaknessesData);

    setSuggestions(suggestionsData);
  };

  const downloadReport = async () => {
    try {
      setReportLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/generate-report",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ats_score: atsScore,
            career: career,
            skills: skills,
            missing_skills:
              missingSkills,
            roadmap: roadmap,
            suggestions:
              suggestions,
          }),
        }
      );

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "Career_Report.pdf";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(
        url
      );
    } catch (error) {
      console.error(error);
    } finally {
      setReportLoading(false);
    }
  };
useEffect(() => {

  const user =
    localStorage.getItem("user");

  if (!user) {

    window.location.href =
      "/login";

    return;
  }

  const parsedUser =
    JSON.parse(user);

  setUserName(
    parsedUser.name
  );

}, []);
const handleLogout = () => {

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "/login";
};
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <main className="flex-1 p-8">
        <div
  className="
    mb-10
    rounded-3xl
    border
    border-cyan-500/20
    bg-gradient-to-r
    from-zinc-900
    via-zinc-900
    to-cyan-950/40
    p-10
    shadow-xl
  "
>
  <div className="flex items-center justify-between">

    <div>

      <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold">
        SmartToolStack AI
      </p>

      <h1 className="text-6xl font-extrabold text-white mt-3">
        Welcome Back,
      </h1>

      <h2 className="text-5xl font-bold text-cyan-400 mt-2">
        {userName || "User"} 👋
      </h2>

      <p className="text-zinc-400 text-lg mt-6 max-w-2xl leading-8">
        Build resumes, analyze ATS scores,
        prepare interviews, and accelerate your
        career with AI-powered tools.
      </p>

    </div>

    <div
      className="
        hidden
        xl:flex
        items-center
        justify-center
        w-44
        h-44
        rounded-full
        bg-cyan-500/10
        border
        border-cyan-500/20
        text-7xl
      "
    >
      🚀
    </div>

  </div>
</div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          <ATSCard score={atsScore} />
<SkillGapCard />
<CareerScoreCard />
<ReportsCard total={totalReports} />
        </div>

        {/* Career Path */}
        <div
  className="
    mt-8
    bg-gradient-to-r
    from-cyan-950/30
    to-zinc-900
    border
    border-cyan-500/20
    rounded-3xl
    p-8
  "
>
  <div className="flex items-center gap-4">

    <div
      className="
        w-16
        h-16
        rounded-2xl
        bg-cyan-500/20
        flex
        items-center
        justify-center
        text-3xl
      "
    >
      🚀
    </div>

    <div>

      <h2
        className="
          text-lg
          text-zinc-400
          font-semibold
        "
      >
        Recommended Career Path
      </h2>

      <p
        className="
          text-3xl
          font-bold
          text-cyan-400
          mt-2
        "
      >
        {career || "Upload Resume"}
      </p>

    </div>

  </div>

  <div
    className="
      mt-6
      h-1
      rounded-full
      bg-gradient-to-r
      from-cyan-400
      to-blue-500
    "
  />
</div>

        <ResumeUpload
          onAnalysisComplete={
            handleAnalysisComplete
          }
        />

        {/* Detected Skills */}
        <div
  className="
    mt-8
    bg-gradient-to-br
    from-zinc-900
    to-zinc-950
    border
    border-zinc-800
    rounded-3xl
    p-8
  "
>
          <h2 className="text-xl text-white font-bold">
            Detected Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-4">
            {skills.map((skill, index) => (
  <div
    key={index}
    className="
      px-4
      py-2
      rounded-full
      bg-green-500/15
      border
      border-green-500/40
      text-green-300
      hover:scale-105
      transition
      cursor-default
    "
  >
    ✓ {skill}
  </div>
))}
          </div>
        </div>

        {/* Missing Skills */}
        <div
  className="
    mt-8
    bg-gradient-to-br
    from-zinc-900
    to-zinc-950
    border
    border-zinc-800
    rounded-3xl
    p-8
  "
>
          <h2 className="text-xl text-white font-bold">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-4">
            {missingSkills.map((skill, index) => (
  <div
    key={index}
    className="
      px-4
      py-2
      rounded-full
      bg-red-500/15
      border
      border-red-500/40
      text-red-300
      hover:scale-105
      transition
      cursor-default
    "
  >
    ✗ {skill}
  </div>
))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-8">
          <RoadmapCard roadmap={roadmap} />
        </div>

        {/* Resume Analysis Report */}
        <div
  className="
    mt-8
    bg-gradient-to-br
    from-zinc-900
    to-zinc-950
    border
    border-zinc-800
    rounded-3xl
    p-8
  "
>
          <h2 className="text-xl font-bold text-white">
            Resume Analysis Report
          </h2>

          <div className="mt-6">
            <h3 className="text-green-400 font-bold">
              Strengths
            </h3>

            <ul className="mt-2 space-y-2">
              {strengths.map((item, index) => (
                <li
                  key={index}
                  className="text-zinc-300"
                >
                  ✓ {item}
                </li>
              ))}
            </ul>

            <h3 className="text-red-400 font-bold mt-6">
              Weaknesses
            </h3>

            <ul className="mt-2 space-y-2">
              {weaknesses.map((item, index) => (
                <li
                  key={index}
                  className="text-zinc-300"
                >
                  ✗ {item}
                </li>
              ))}
            </ul>

            <h3 className="text-cyan-400 font-bold mt-6">
              Recommendations
            </h3>

            <ul className="mt-2 space-y-2">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="text-zinc-300"
                >
                  → {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download PDF Report */}
        <div className="mt-8">
          <button
            onClick={downloadReport}
            disabled={reportLoading}
            className="
              px-6
              py-3
              rounded-xl
              bg-cyan-500
              text-black
              font-bold
              hover:bg-cyan-400
            "
          >
            {reportLoading
              ? "Generating..."
              : "Download PDF Report"}
          </button>
        </div>

        {/* Job Match Analyzer */}
        <JobMatch skills={skills} />
      </main>
    </div>
  );
}