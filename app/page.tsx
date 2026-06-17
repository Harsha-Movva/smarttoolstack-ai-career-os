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

export default function Home() {
  const [userName, setUserName] =
  useState("");
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
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-4xl font-bold text-white">
      Welcome {userName || "User"} 👋
    </h1>

    <p className="text-zinc-400 mt-2">
      SmartToolStack AI Career OS
    </p>

  </div>

  {userName && (

  <button
  onClick={handleLogout}
  className="
    px-6
    py-3
    rounded-xl
    bg-red-500
    text-white
    font-semibold
    hover:bg-red-400
    transition
    shadow-lg
  "
>
  Logout
</button>

)}

</div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <ATSCard score={atsScore} />
          <SkillGapCard />
          <CareerScoreCard />
        </div>

        {/* Career Path */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h2 className="text-xl text-white font-bold">
            Recommended Career Path
          </h2>

          <p className="text-3xl text-cyan-400 mt-4">
            {career || "Upload Resume"}
          </p>
        </div>

        <ResumeUpload
          onAnalysisComplete={
            handleAnalysisComplete
          }
        />

        {/* Detected Skills */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
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
  rounded-xl
  border
  border-green-500
  bg-zinc-800
  text-white
"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
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
  rounded-xl
  border
  border-red-500
  bg-zinc-800
  text-white
"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-8">
          <RoadmapCard roadmap={roadmap} />
        </div>

        {/* Resume Analysis Report */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
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