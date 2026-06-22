"use client";

import { useState } from "react";

export default function InterviewPage() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] =
  useState<string[]>([]);
  const [atsScore, setAtsScore] =
    useState(0);
  const [careerAdvice, setCareerAdvice] =
  useState("");
  const [interviewScore, setInterviewScore] =
    useState(0);
  const [allStrengths, setAllStrengths] =
  useState<string[]>([]);
  const [resumeText, setResumeText] =
  useState("");
  const [resumeFile, setResumeFile] =
  useState<File | null>(null);
  const [allWeaknesses, setAllWeaknesses] =
  useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] =
  useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] =
  useState<any>(null);
  const [allScores, setAllScores] =
  useState<number[]>([]);
  const [interviewCompleted, setInterviewCompleted] =
  useState(false);
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

      setQuestions(
  data.questions
);

setCurrentQuestion(0);

setAnswer("");

setFeedback(null);

    } catch (error) {
      console.error(error);
    }
  };
  const generateCareerAdvice =
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
              interview_score:
                average,
              skills:
                "Python, SQL, ML",
            }),
          }
        );

      const data =
        await response.json();

      setCareerAdvice(
        data.advice
      );

    } catch (error) {

      console.error(
        error
      );

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
          question:
            questions[currentQuestion],
          answer,
        }),
      }
    );

    const data =
      await response.json();

    let feedbackObj =
      data.feedback;

    if (
      typeof feedbackObj === "string"
    ) {
      try {

        let cleaned =
          feedbackObj.trim();

        if (
          cleaned.startsWith(
            "```json"
          )
        ) {
          cleaned =
            cleaned.substring(7);
        } else if (
          cleaned.startsWith(
            "```"
          )
        ) {
          cleaned =
            cleaned.substring(3);
        }

        if (
          cleaned.endsWith(
            "```"
          )
        ) {
          cleaned =
            cleaned.substring(
              0,
              cleaned.length - 3
            );
        }

        feedbackObj =
          JSON.parse(
            cleaned.trim()
          );

      } catch (
        parseError
      ) {

        console.error(
          "Failed to parse feedback:",
          parseError
        );

        feedbackObj = {
          score: 0,
          strengths: [
            "Could not parse response."
          ],
          weaknesses: [
            "Invalid AI response."
          ],
          improved_answer:
            "Please try again."
        };

      }
    }

    setFeedback(
      feedbackObj
    );
    setAllStrengths(
  (prev) => [
    ...prev,
    ...(feedbackObj.strengths || [])
  ]
);

setAllWeaknesses(
  (prev) => [
    ...prev,
    ...(feedbackObj.weaknesses || [])
  ]
);
    setAllScores(
  (prev) => [
    ...prev,
    feedbackObj.score
  ]
);

  } catch (error) {

    console.error(
      error
    );

  }
};
const average =
  allScores.reduce(
    (a, b) => a + b,
    0
  ) / allScores.length;
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
<input
  type="file"
  accept=".pdf"
  onChange={(e) => {

    if (
      e.target.files &&
      e.target.files[0]
    ) {
      setResumeFile(
        e.target.files[0]
      );
    }

  }}
  className="
    w-full
    mt-6
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
>
  Generate Question
</button>

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

        {questions.length > 0 && (
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
              Question {currentQuestion + 1}/5

<br />

{questions[currentQuestion]}
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

    {currentQuestion < 4 ? (

  <button
    onClick={() => {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setAnswer("");

      setFeedback(null);

    }}
    className="
      mt-6
      px-6
      py-3
      rounded-xl
      bg-blue-500
      text-black
      font-bold
    "
  >
    Next Question
  </button>

) : (

  <button
    onClick={() => {

      setInterviewCompleted(
        true
      );

    }}
    className="
      mt-6
      px-6
      py-3
      rounded-xl
      bg-purple-500
      text-black
      font-bold
    "
  >
    Finish Interview
  </button>

)}

  </div>
)}
          </div>
        )}
        {interviewCompleted && (

  <div
    className="
      mt-8
      bg-zinc-800
      p-6
      rounded-xl
    "
  >

    <h2
      className="
        text-3xl
        font-bold
        text-cyan-400
      "
    >
      Final Interview Report
    </h2>

    <div
      className="
        mt-4
        text-2xl
        font-bold
      "
    >
      Average Score:
      {average.toFixed(1)}/10
      <div className="mt-6">

  <h3 className="text-green-400 font-bold">
    Strengths
  </h3>

  <ul className="mt-2">
    {[...new Set(allStrengths)]
      .slice(0, 5)
      .map(
        (
          item,
          index
        ) => (
          <li key={index}>
            ✓ {item}
          </li>
        )
      )}
  </ul>

</div>

<div className="mt-6">

  <h3 className="text-red-400 font-bold">
    Weaknesses
  </h3>

  <ul className="mt-2">
    {[...new Set(allWeaknesses)]
      .slice(0, 5)
      .map(
        (
          item,
          index
        ) => (
          <li key={index}>
            ✗ {item}
          </li>
        )
      )}
  </ul>

</div>
    </div>

    <div className="mt-4">

      {average >= 8 && (
        <p className="text-green-400">
          Hiring Recommendation:
          Strong Hire
        </p>
      )}

      {average >= 5 &&
        average < 8 && (
        <p className="text-yellow-400">
          Hiring Recommendation:
          Consider
        </p>
      )}

      {average < 5 && (
        <p className="text-red-400">
          Hiring Recommendation:
          Needs Improvement
        </p>
      )}
      <button
  onClick={
    generateCareerAdvice
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
  Generate AI Career Advice
</button>
{careerAdvice && (

  <div
    className="
      mt-6
      p-4
      bg-zinc-700
      rounded-xl
      whitespace-pre-wrap
    "
  >
    {careerAdvice}
  </div>

)}

    </div>

  </div>

)}
      </div>
    </div>
  );
}