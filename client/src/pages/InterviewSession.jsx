import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInterview,
  updateInterview,
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  completeInterview,
} from "../services/interviewServices.js";

function InterviewSession() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInterview(id);

        const loadedInterview = data.interview;

        setInterview(loadedInterview);

        const existingQuestions = loadedInterview.questions || [];

        // Questions already exist in MongoDB
        if (existingQuestions.length > 0) {
          setQuestions(existingQuestions);
          setCurrentQuestion(0);
          setAnswer(existingQuestions[0]?.answer || "");

          return;
        }

        // No questions → generate them using Gemini
        setGenerating(true);

        const generatedData = await generateInterviewQuestions(id);

        const generatedQuestions = generatedData.questions || [];

        setQuestions(generatedQuestions);

        setInterview(generatedData.interview || loadedInterview);

        setCurrentQuestion(0);

        setAnswer(generatedQuestions[0]?.answer || "");
      } catch (err) {
        console.error("interview session error:", err);
        console.error("response:", err.response?.data);
        console.error("STATUS:", err.response?.status);

        setError(err.response?.data?.message || "Unable to load interview.");
      } finally {
        setGenerating(false);
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  const handleNext = async () => {
    if (!answer.trim()) {
      setError("Please enter your answer before continuing.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const currentQuestionData = questions[currentQuestion];

      // Step 1: Send answer to Gemini for evaluation
      const evaluationData = await evaluateInterviewAnswer(
        id,
        currentQuestionData._id,
        answer.trim(),
      );

      // Step 2: Update the current question locally
      const updatedQuestions = [...questions];

      updatedQuestions[currentQuestion] = {
        ...updatedQuestions[currentQuestion],
        answer: answer.trim(),
        score: evaluationData.question.score,
        feedback: evaluationData.question.feedback,
      };

      // Step 3: Update interview state
      setQuestions(updatedQuestions);

      // Step 4: Check if this is the last question
      const isLastQuestion = currentQuestion === questions.length - 1;

      if (isLastQuestion) {
        const completedData = await completeInterview(id);
        setInterview(completedData.interview);
        return;
      }

      // Step 5: Move to next question
      const nextIndex = currentQuestion + 1;

      setCurrentQuestion(nextIndex);

      setAnswer(updatedQuestions[nextIndex]?.answer || "");
    } catch (err) {
      console.error("ANSWER EVALUATION ERROR:", err);
      console.error("RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.message || "Unable to evaluate your answer.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    const previousIndex = currentQuestion - 1;

    setCurrentQuestion(previousIndex);
    setAnswer(questions[previousIndex]?.answer || "");
    setError("");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#013364]" />
          <p className="mt-4 text-sm text-gray-500">
            {generating
              ? "Preparing your personalized interview..."
              : "Loading interview..."}
          </p>{" "}
        </div>
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const totalQuestions = questions.length;
  const questionNumber = currentQuestion + 1;
  const progress =
    totalQuestions > 0 ? (questionNumber / totalQuestions) * 100 : 0;

  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* HEADER */}

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
          Interview Session
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-950">
              {interview.targetRole}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {interview.company || "General interview"} •{" "}
              {interview.interviewType} • {interview.difficulty}
            </p>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-600">
            {interview.status}
          </span>
        </div>
      </div>

      {/* SESSION CARD */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* PROGRESS */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              Question {questionNumber} of {totalQuestions}
            </p>

            <p className="text-xs font-medium text-gray-500">
              {Math.round(progress)}%
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#013364] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* QUESTION */}

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#013364]">
            Question {questionNumber}
          </p>

          <h2 className="mt-3 text-xl font-semibold leading-8 text-gray-950 sm:text-2xl">
            {questions[currentQuestion]?.question}
          </h2>
        </div>

        {/* ANSWER */}

        <div className="mt-8">
          <label
            htmlFor="answer"
            className="mb-2 block text-sm font-semibold text-gray-900"
          >
            Your Answer
          </label>

          <textarea
            id="answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Type your answer here..."
            rows={8}
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
          />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* NAVIGATION */}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || saving}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={saving}
            className="rounded-xl bg-[#013364] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : currentQuestion === totalQuestions - 1
                ? "Finish Interview"
                : "Next Question"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default InterviewSession;
