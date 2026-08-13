import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getInterviews } from "../services/interviewServices";

function Dashboard() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "completed",
  );

  const scoredInterviews = interviews.filter(
    (interview) => interview.score !== null,
  );
  const averageScore =
    scoredInterviews.length > 0
      ? scoredInterviews.reduce((sum, interview) => sum + interview.score, 0) /
        scoredInterviews.length
      : null;

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews();
        setInterviews(data.interviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInterviews();
  }, []);

  return (
    <div className="min-h-full bg-[#fafafa]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#013364]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Welcome to InterviewIQ 👋 , {user?.name}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here's an overview of your interview preparation.
          </p>
        </div>

        <Link
          to="/interview"
          className="inline-flex w-fit items-center rounded-lg bg-[#013364] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#081f38]"
        >
          Start Interview
          <span className="ml-2">→</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Interviews</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">
            {completedInterviews.length}
          </p>
          <p className="mt-1 text-xs text-gray-400">Completed interviews</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">
            {averageScore !== null ? Math.round(averageScore) : "--"}
          </p>
          <p className="mt-1 text-xs text-gray-400">Based on your interviews</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Questions Practiced</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">0</p>
          <p className="mt-1 text-xs text-gray-400">Across all interviews</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Resume</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">—</p>
          <p className="mt-1 text-xs text-gray-400">No resume analyzed yet</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Interview Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-950">
                Interview Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track your preparation and interview performance.
              </p>
            </div>
          </div>

          <div className="mt-8 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
              🎯
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              No interviews yet
            </h3>

            <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
              Start your first interview to begin tracking your performance and
              identify areas where you can improve.
            </p>

            <Link
              to="/interview"
              className="mt-5 text-sm font-medium text-[#013364] hover:underline"
            >
              Start your first interview →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-950">Quick Actions</h2>

          <p className="mt-1 text-sm text-gray-500">
            Continue your preparation.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              to="/resume"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              <span>Analyse Resume</span>
              <span className="text-gray-400">→</span>
            </Link>

            <Link
              to="/interview"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              <span>Start Interview</span>
              <span className="text-gray-400">→</span>
            </Link>

            <Link
              to="/reports"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              <span>View Reports</span>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-950">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest preparation activity will appear here.
          </p>
        </div>

        <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg bg-gray-50 px-6 text-center">
          <p className="text-sm text-gray-500">
            No recent activity. Start preparing to see your progress here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
