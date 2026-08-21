import { useEffect,useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import {
  getInterview,
  updateInterview,
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  completeInterview,
} from "../services/interviewServices.js";

function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const [isSpeaking, setIsSpeaking] = useState(false);

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
  //voice recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setAnswer(transcript);
    };

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      setIsListening(false);
      //mic permission error
      if (event.error === "not-allowed") {
        setError("Microphone permission was denied.");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

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
        await completeInterview(id);
        navigate(`/interviews/${id}/report`);
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

  const handleStartListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) return;

    setError("");

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Unable to start speech recognition:", error);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    const previousIndex = currentQuestion - 1;

    setCurrentQuestion(previousIndex);
    setAnswer(questions[previousIndex]?.answer || "");
    setError("");
  };

  const speakQuestion = (text) => {
    if (!("speechSynthesis" in window) || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  //ques chnage hote hi automatic question speak karne ke liye
  useEffect(() => {
    const question = questions[currentQuestion]?.question;

    if (question) {
      speakQuestion(question);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentQuestion, questions]);

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
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                speakQuestion(questions[currentQuestion]?.question)
              }
              disabled={isSpeaking}
              className="inline-flex items-center gap-2 rounded-lg border border-[#013364]/15 bg-[#013364]/5 px-3 py-2 text-sm font-medium text-[#013364] transition hover:bg-[#013364]/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Volume2 size={16} />
              {isSpeaking ? "Speaking..." : "Read question"}
            </button>

            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <VolumeX size={16} />
                Stop
              </button>
            )}
          </div>
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
          {speechSupported && (
            <div className="mt-3 flex items-center gap-3">
              {!isListening ? (
                <button
                  type="button"
                  onClick={handleStartListening}
                  disabled={saving}
                  className="rounded-xl border border-[#013364]/20 bg-[#013364]/5 px-4 py-2.5 text-sm font-medium text-[#013364] transition hover:bg-[#013364]/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  🎤 Start speaking
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopListening}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  ⏹ Stop listening
                </button>
              )}

              {isListening && (
                <span className="flex items-center gap-2 text-sm text-red-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  Listening...
                </span>
              )}
            </div>
          )}
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
