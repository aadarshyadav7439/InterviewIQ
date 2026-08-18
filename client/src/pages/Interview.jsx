import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createInterview,
  getInterviews,
} from "../services/interviewServices.js";

function Interview() {
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState("");
  const [company, setCompany] = useState("");
  const [interviewType, setInterviewType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(10);

  const [loading, setLoading] = useState(false);
  const [fetchingInterviews, setFetchingInterviews] = useState(true);
  const [error, setError] = useState("");
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews();
        setInterviews(data.interviews || []);
      } catch (err) {
        setError("Unable to fetch interviews.");
      } finally {
        setFetchingInterviews(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!targetRole.trim()) {
      setError("Please enter your target role.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await createInterview({
        targetRole: targetRole.trim(),
        company: company.trim(),
        interviewType,
        difficulty,
        questionCount,
      });

      const createdInterview = data.interview;

      if (createdInterview?._id) {
        navigate(`/interviews/${createdInterview._id}`);
        return;
      }

      setError("Interview was created, but the interview ID was not returned.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      {/* PAGE HEADER */}

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
          Interview
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
          Create your interview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Set up your interview and we&apos;ll prepare a session based on your
          role, interview type, and difficulty.
        </p>
      </div>

      {/* CREATE INTERVIEW CARD */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TARGET ROLE */}

          <div>
            <label
              htmlFor="targetRole"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Target Role
            </label>

            <input
              id="targetRole"
              type="text"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="e.g. Software Engineer"
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
            />
          </div>

          {/* COMPANY */}

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Company
              <span className="ml-1 text-xs font-normal text-gray-400">
                Optional
              </span>
            </label>

            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="e.g. Google"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
            />
          </div>

          {/* TYPE + DIFFICULTY */}

          <div className="grid gap-5 sm:grid-cols-2">
            {/* INTERVIEW TYPE */}

            <div>
              <label
                htmlFor="interviewType"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Interview Type
              </label>

              <select
                id="interviewType"
                value={interviewType}
                onChange={(event) => setInterviewType(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
              >
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            {/* DIFFICULTY */}

            <div>
              <label
                htmlFor="difficulty"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Difficulty
              </label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          {/* no of questions */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-800">
              Number of Questions
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[10, 20, 30, 40, 50].map((count) => {
                const selected = questionCount === count;

                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-xl border px-3 py-4 text-center transition ${
                      selected
                        ? "border-[#013364] bg-[#013364]/5 text-[#013364] ring-2 ring-[#013364]/10"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#013364]/30 hover:bg-gray-50"
                    }`}
                  >
                    <span className="block text-lg font-semibold">{count}</span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Questions
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* START BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#013364] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating interview..." : "Start Interview"}
          </button>
        </form>
      </section>

      {/* RECENT INTERVIEWS */}

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-950">
            Recent Interviews
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your previously created interview sessions.
          </p>
        </div>

        {fetchingInterviews ? (
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
            Loading interviews...
          </div>
        ) : interviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">
              No interviews yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first interview above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {interviews.map((interview) => (
              <button
                key={interview._id}
                type="button"
                onClick={() => navigate(`/interviews/${interview._id}`)}
                className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-[#013364]/30 hover:shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {interview.targetRole}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {interview.company || "General interview"} •{" "}
                      {interview.interviewType} • {interview.difficulty} •{" "}
                      {interview.questionCount} questions
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                    {interview.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Interview;
