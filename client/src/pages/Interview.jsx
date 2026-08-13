import { useState,useEffect } from "react";
import {
  createInterview,
  getInterviews,
} from "../services/interviewServices.js";

function Interview() {
  const [company, setCompany] = useState("");
  const [interviewType, setInterviewType] = useState("Technical");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews();
        setInterviews(data.interviews);
      } catch (err) {
        setError("Unable to fetch interviews.");
      }
    };

    fetchInterviews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
await createInterview({
  company,
  interviewType,
  questions: [
    {
      question: "Explain REST API.",
    },
  ],
});      setSuccess("Interview created successfully.");
      setCompany("");
      setInterviewType("Technical");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Create Interview
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="company"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="interviewType"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Interview Type
          </label>
          <select
            id="interviewType"
            value={interviewType}
            onChange={(event) => setInterviewType(event.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option>Technical</option>
            <option>HR</option>
            <option>Behavioral</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Starting..." : "Start Interview"}
        </button>
      </form>

      {interviews.map((interview) => (
  <div key={interview._id}>
    <h2>{interview.company}</h2>

    {interview.questions?.map((question, index) => (
      <p key={index}>
        Q{index + 1}: {question.question}
      </p>
    ))}
  </div>
))}
    </main>
  );
}

export default Interview;
