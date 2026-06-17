"use client";

import { useState } from "react";

export default function CoverLetterPage() {
  const [name, setName] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [jobRole, setJobRole] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const handleGenerate = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-cover-letter",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            company,
            job_role: jobRole,
            skills,
            experience,
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
        "CoverLetter.pdf";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold">
        AI Cover Letter Generator
      </h1>

      <p className="text-zinc-400 mt-3">
        Generate a professional cover letter.
      </p>

      <div
        className="
          mt-10
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          max-w-4xl
        "
      >

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
            "
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
            "
          />

          <input
            type="text"
            placeholder="Job Role"
            value={jobRole}
            onChange={(e) =>
              setJobRole(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
            "
          />

          <textarea
            rows={4}
            placeholder="Skills"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
            "
          />

          <textarea
            rows={5}
            placeholder="Experience / Projects"
            value={experience}
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
            "
          />

          <button
            onClick={handleGenerate}
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
            Generate Cover Letter
          </button>

        </div>

      </div>

    </div>
  );
}