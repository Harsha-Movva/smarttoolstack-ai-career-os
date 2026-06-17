"use client";

import { useState } from "react";

export default function InterviewPage() {
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const generateQuestion = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-question",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            role,
          }),
        }
      );

      const data =
        await response.json();

      setQuestion(
        data.question
      );

    } catch (error) {
      console.error(error);
    }
  };

  const evaluateAnswer = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/evaluate-answer",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            question,
            answer,
          }),
        }
      );

      const data =
        await response.json();

      setFeedback(
        data.feedback
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold">
        Interview Copilot
      </h1>

      <p className="text-zinc-400 mt-3">
        Practice AI-powered interviews.
      </p>

      <div
        className="
          mt-10
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
        "
      >

        <input
          type="text"
          placeholder="Role (Data Scientist)"
          value={role}
          onChange={(e) =>
            setRole(
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
          onClick={
            generateQuestion
          }
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
          Generate Question
        </button>

        {question && (
          <div className="mt-8">

            <h2
              className="
                text-xl
                font-bold
              "
            >
              Question
            </h2>

            <p className="mt-3">
              {question}
            </p>

            <textarea
              rows={6}
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) =>
                setAnswer(
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
              onClick={
                evaluateAnswer
              }
              className="
                mt-6
                px-6
                py-3
                rounded-xl
                bg-green-500
                text-black
                font-bold
              "
            >
              Evaluate Answer
            </button>

            {feedback && (
              <div
                className="
                  mt-8
                  bg-zinc-800
                  p-6
                  rounded-xl
                "
              >
                <h3
                  className="
                    text-green-400
                    font-bold
                  "
                >
                  Feedback
                </h3>

                <p className="mt-3">
                  {feedback}
                </p>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}