"use client";

import { useState } from "react";

export default function InterviewPage() {
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] =
  useState<any>(null);
  
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

console.log(
  "Gemini Feedback:",
  data.feedback
);

      setQuestion(
        data.question
      );

    } catch (error) {
      console.error(error);
    }
  };

  const evaluateAnswer = async () => {
    if (!answer.trim()) {
  alert("Please enter an answer.");
  return;
}
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

      let feedbackObj = data.feedback;
      if (typeof feedbackObj === "string") {
        try {
          let cleaned = feedbackObj.trim();
          if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
          } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
          }
          if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(0, cleaned.length - 3);
          }
          feedbackObj = JSON.parse(cleaned.trim());
        } catch (parseError) {
          console.error("Failed to parse feedback string:", parseError);
          feedbackObj = {
            score: 0,
            strengths: ["Could not parse response structure."],
            weaknesses: ["AI response structure was invalid."],
            improved_answer: "Please try submitting again."
          };
        }
      }

      setFeedback(feedbackObj);

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
                <h3 className="text-cyan-400 font-bold text-xl">
                  <div
  className={`
    text-2xl
    font-bold
    ${
      feedback.score >= 8
        ? "text-green-400"
        : feedback.score >= 5
        ? "text-yellow-400"
        : "text-red-400"
    }
  `}
>
  Score: {feedback.score}/10
</div>
                </h3>

                <div className="mt-6">
                  <h4 className="text-green-400 font-bold">
                    Strengths
                  </h4>

                  <ul className="mt-2">
                    {feedback.strengths?.map(
                      (
                        item: string,
                        index: number
                      ) => (
                        <li key={index}>
                          ✓ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-red-400 font-bold">
                    Weaknesses
                  </h4>

                  <ul className="mt-2">
                    {feedback.weaknesses?.map(
                      (
                        item: string,
                        index: number
                      ) => (
                        <li key={index}>
                          ✗ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-yellow-400 font-bold">
                    Improved Answer
                  </h4>

                  <p className="mt-2 text-zinc-300">
                    {feedback.improved_answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}