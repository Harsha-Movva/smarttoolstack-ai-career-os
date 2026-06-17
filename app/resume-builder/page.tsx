"use client";

import { useState } from "react";

export default function ResumeBuilderPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [education, setEducation] = useState("");

  const handleGenerate = async () => {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/generate-resume",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          phone,
          skills,
          projects,
          education,
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
      "Resume.pdf";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(
      url
    );

  } catch (error) {

    console.error(
      "Resume generation error:",
      error
    );

  }
};

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold">
        AI Resume Builder
      </h1>

      <p className="text-zinc-400 mt-3">
        Generate an ATS-friendly resume using AI.
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
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
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            rows={4}
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
            placeholder="Projects"
            value={projects}
            onChange={(e) =>
              setProjects(e.target.value)
            }
            rows={6}
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
            placeholder="Education"
            value={education}
            onChange={(e) =>
              setEducation(e.target.value)
            }
            rows={4}
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
            Generate Resume
          </button>

        </div>

      </div>

    </div>
  );
}