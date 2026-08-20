import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInterview } from "../services/interviewServices";

const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const data = await getInterview(id);
        setInterview(data.interview);
      } catch (err) {
        console.error("GET REPORT ERROR:", err);

        setError(
          err.response?.data?.message || "Unable to load interview report.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#013364] border-t-transparent" />
          <p className="mt-4 font-medium text-gray-500">Loading your interview report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="font-medium text-red-500">{error}</p>

          <button onClick={() => navigate("/interview")}
            className="mt-5 rounded-xl bg-[#013364] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01264b]"
          >
            Back to Interviews
          </button>
        </div>
      </div>
    );
  }

  if (!interview){
    return null;
  }

  let reportFeedback = {
    summary: "",
    strengths: [],
    weaknesses: [],
    suggestions: [],
  };

  try {
    if (interview.feedback) {
      reportFeedback = JSON.parse(interview.feedback);
    }
  } catch (error) {
    console.error("FEEDBACK PARSE ERROR:", error);
  }

  const overallScore = interview.overallScore ?? 0;

  const getPerformance = (score) => {
    if(score >= 90){
      return {
        label: "Excellent Performance",
        description: "You demonstrated outstanding interview performance.",
        color: "text-green-600",
      };
    }

    if(score >= 75){
      return {
        label: "Strong Performance",
        description:
          "You have a solid understanding with a few areas to improve.",
        color: "text-blue-600",
      };
    }

    if(score >= 60){
      return {
        label: "Good Performance",
        description: "You performed well, but there is room for improvement.",
        color: "text-yellow-600",
      };
    }

    if(score >= 40){
      return {
        label: "Needs Improvement",
        description:
          "Focus on strengthening your concepts and answer structure.",
        color: "text-orange-600",
      };
    }

    return{
      label: "Keep Practicing",
      description:
        "More preparation and practice will significantly improve your performance.",
      color: "text-red-600",
    };
  };

  const performance =getPerformance(overallScore);

  const getQuestionScoreStyle = (score) => {
    if(score >= 8){
      return "bg-green-50 text-green-700 border-green-100";
    }

    if(score>= 6) {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    if (score >= 4) {
      return "bg-yellow-50 text-yellow-700 border-yellow-100";
    }

    return "bg-red-50 text-red-700 border-red-100";
  };

  return(
    <div className="min-h-screen bg-[#f7f9fc] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/interview")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#013364]"
        >
          <span className="text-lg">←</span>
          Back to Interviews
        </button>

        {/* Header */}
        <div className="mb-6 rounded-3xl bg-[#013364] p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold text-green-200">
                  ✓ COMPLETED
                </span>

                <span className="text-sm text-blue-200">Interview Report</span>
              </div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                {interview.targetRole}
              </h1>

              <p className="mt-2 text-base text-blue-100">
                {interview.company || "General Interview"}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-blue-50">
                  {interview.interviewType}
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-blue-50">
                  {interview.difficulty}
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-blue-50">
                  {interview.questions?.length || interview.questionCount}{" "}
                  Questions
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-5 rounded-2xl bg-white p-5 text-gray-900 shadow-md">
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#013364 ${overallScore * 3.6}deg, #e5e7eb 0deg)`,
                }}
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-[#013364]">{overallScore}</span>
                  <span className="text-xs text-gray-400">/100</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400">Overall Score</p>
                <p className={`mt-1 text-lg font-bold ${performance.color}`}>{performance.label}</p>
                <p className="mt-1 max-w-[180px] text-xs leading-5 text-gray-500">{performance.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
              📊
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Overall Assessment
              </h2>

              <p className="text-sm text-gray-400">
                AI-powered evaluation of your interview performance
              </p>
            </div>
          </div>

          <p className="mt-5 leading-7 text-gray-600">
            {reportFeedback.summary || "Your interview evaluation is complete."}
          </p>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                💪
              </div>

              <div>
                <h2 className="font-bold text-gray-900">Your Strengths</h2>

                <p className="text-sm text-gray-400">What you did well</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {reportFeedback.strengths.length > 0 ? (
                reportFeedback.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-green-50/70 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-gray-600">
                      {strength}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No strengths available.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-lg">
                🎯
              </div>

              <div>
                <h2 className="font-bold text-gray-900">Areas to Improve</h2>

                <p className="text-sm text-gray-400">
                  Where you can improve further
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {reportFeedback.weaknesses.length > 0 ? (
                reportFeedback.weaknesses.map((weakness, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-orange-50/70 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                      !
                    </span>

                    <p className="text-sm leading-6 text-gray-600">
                      {weakness}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No major weaknesses identified.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
              💡
            </div>

            <div>
              <h2 className="font-bold text-gray-900">AI Recommendations</h2>

              <p className="text-sm text-gray-400">
                Your next steps for improvement
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {reportFeedback.suggestions.length > 0 ? (
              reportFeedback.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-gray-100 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#013364] text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="pt-0.5 text-sm leading-6 text-gray-600">
                    {suggestion}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No recommendations available.
              </p>
            )}
          </div>
        </div>

        {/* Question-wise Performance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Question-wise Performance
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Click any question to view your answer and AI feedback
              </p>
            </div>

            <span className="text-sm font-medium text-gray-500">
              {interview.questions.length} Questions
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {interview.questions.map((question, index) => {
              const isOpen = openQuestion === index;
              const score = question.score ?? 0;

              return (
                <div
                  key={question._id || index}
                  className={`overflow-hidden rounded-xl border transition ${
                    isOpen ? "border-[#013364]/20 shadow-sm" : "border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenQuestion(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-gray-50 sm:p-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#013364] text-sm font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Question {index + 1}
                        </p>

                        <p className="mt-1 truncate font-medium text-gray-800 sm:whitespace-normal">
                          {question.question}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-lg border px-3 py-1.5 text-sm font-bold ${getQuestionScoreStyle(
                          score,
                        )}`}
                      >
                        {score}/10
                      </span>

                      <span className="text-lg text-gray-400">
                        {isOpen ? "⌃" : "⌄"}
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-5">
                      <div className="rounded-xl bg-white p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                          Your Answer
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                          {question.answer || "No answer provided."}
                        </p>
                      </div>

                      {question.feedback && (
                        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                          <div className="flex items-center gap-2">
                            <span>✨</span>

                            <p className="text-sm font-bold text-[#013364]">
                              AI Feedback
                            </p>
                          </div>

                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                            {question.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;
