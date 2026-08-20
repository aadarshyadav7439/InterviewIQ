import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  FileText,
  Mic2,
  TrendingUp,
} from "lucide-react";
import { getInterviews } from "../services/interviewServices";
import { getResume } from "../services/resumeServices";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const [resume, setResume] = useState(null);

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "completed",
  );

  const scoredInterviews = interviews.filter(
    (interview) =>
      interview.overallScore !== null && interview.overallScore !== undefined,
  );

  const averageScore =
    scoredInterviews.length > 0
      ? scoredInterviews.reduce(
          (sum, interview) => sum + interview.overallScore,
          0,
        ) / scoredInterviews.length
      : null;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const interviewsData = await getInterviews();
        setInterviews(interviewsData.interviews || []);
      } catch (error) {
        console.log("Interview fetch error:", error);
      }

      try {
        const resumeData = await getResume();
        setResume(resumeData.resume || null);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.log("Resume fetch error:", error);
        }
      }
    };

    fetchDashboardData();
  }, []);

  const questionsPracticed = interviews.reduce(
    (total, interview) => total + (interview.questions?.length || 0),
    0,
  );

  const resumeScore = resume?.analysis?.overallScore ?? null;

  const performanceData = completedInterviews
    .filter(
      (interview) =>
        interview.overallScore !== null && interview.overallScore !== undefined,
    )
    .slice(0, 6)
    .reverse()
    .map((interview) => ({
      label: new Date(interview.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      score: interview.overallScore,
    }));

  const displayedRecentInterviews = interviews.slice(0, 3).map((interview) => ({
    company: interview.company || "Interview",
    type: interview.interviewType || "General",
    score: interview.overallScore ?? "--",
    date: interview.createdAt
      ? new Date(interview.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "Recent",
  }));

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
            Your progress
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Keep getting better.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Practice consistently, review your performance, and build confidence
            before your next interview.
          </p>
        </div>

        <Link
          to="/interview"
          className="inline-flex w-fit items-center rounded-lg bg-[#013364] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#081f38]"
        >
          Start Interview
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>

      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Interviews */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#013364]/20 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Interviews</p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {completedInterviews.length}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
              <Mic2 size={18} strokeWidth={1.8} />
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-400">Completed interviews</p>
        </div>

        {/* Average Score */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#013364]/20 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Score</p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {averageScore !== null ? Math.round(averageScore) : "--"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
              <TrendingUp size={18} strokeWidth={1.8} />
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-400">Across scored interviews</p>
        </div>

        {/* Questions */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#013364]/20 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Questions</p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {questionsPracticed}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
              <BarChart3 size={18} strokeWidth={1.8} />
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-400">Questions practiced</p>
        </div>

        {/* Resume */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#013364]/20 hover:shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Resume Score</p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                {resumeScore !== null ? resumeScore : "--"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#013364]/6 text-[#013364]">
              <FileText size={18} strokeWidth={1.8} />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {resumeScore !== null
              ? "Based on your latest analysis"
              : "Analyze your resume to get a score"}
          </p>
        </div>
      </div>

      {/* Performance + Quick Actions */}

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Performance */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-950">
                Performance overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track how your interview performance is improving over time.
              </p>
            </div>

            {performanceData.length >= 2 && (
              <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 sm:inline-flex">
                Last {performanceData.length} interviews
              </span>
            )}
          </div>

          <div className="mt-8">
            {performanceData.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="flex h-56 min-w-[520px] items-end gap-3 border-b border-l border-gray-200 px-4 pb-0 pt-6 sm:gap-5">
                  {performanceData.map((item) => (
                    <div
                      key={item.label}
                      className="flex h-full flex-1 flex-col justify-end"
                    >
                      <div
                        className="rounded-t-md bg-[#013364] transition hover:bg-[#081f38]"
                        style={{
                          height: `${item.score}%`,
                          opacity: item.score / 110,
                        }}
                        title={`${item.score}/100`}
                      />

                      <span className="mt-3 text-center text-xs text-gray-400">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
                <div className="text-center">
                  <BarChart3
                    size={28}
                    className="mx-auto text-gray-300"
                    strokeWidth={1.5}
                  />

                  <p className="mt-3 text-sm font-medium text-gray-500">
                    No performance data yet
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Complete an interview to see your progress.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-950">Quick actions</h2>

          <p className="mt-1 text-sm text-gray-500">
            Continue your preparation.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              to="/resume"
              className="group flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FileText
                  size={18}
                  className="text-[#013364]"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Analyze Resume
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Improve your resume
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#013364]"
              />
            </Link>

            <Link
              to="/interview"
              className="group flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Mic2 size={18} className="text-[#013364]" strokeWidth={1.8} />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Start Interview
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Practice a mock interview
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#013364]"
              />
            </Link>

            <Link
              to="/reports"
              className="group flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <BarChart3
                  size={18}
                  className="text-[#013364]"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    View Reports
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Review your performance
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#013364]"
              />
            </Link>
          </div>
        </section>
      </div>

      {/* Recent Interviews */}

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-950">
              Recent interviews
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest interview practice sessions.
            </p>
          </div>

          {interviews.length > 0 && (
            <Link
              to="/reports"
              className="hidden text-sm font-medium text-[#013364] hover:underline sm:block"
            >
              View all
            </Link>
          )}
        </div>

        <div className="mt-6">
          {displayedRecentInterviews.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-[1.5fr_1fr_0.7fr_1fr] border-b border-gray-100 px-4 pb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                  <span>Company</span>
                  <span>Type</span>
                  <span>Score</span>
                  <span>Date</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {displayedRecentInterviews.map((interview, index) => (
                    <div
                      key={`${interview.company}-${interview.date}-${index}`}
                      className="grid grid-cols-[1.5fr_1fr_0.7fr_1fr] items-center px-4 py-4 transition hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600">
                          {interview.company.charAt(0)}
                        </div>

                        <span className="text-sm font-medium text-gray-900">
                          {interview.company}
                        </span>
                      </div>

                      <span className="text-sm text-gray-500">
                        {interview.type}
                      </span>

                      <span className="text-sm font-semibold text-gray-900">
                        {interview.score}
                      </span>

                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock3 size={14} />
                        {interview.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
              <Mic2 size={30} className="text-gray-300" strokeWidth={1.5} />

              <p className="mt-3 text-sm font-medium text-gray-600">
                No interviews yet
              </p>

              <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                Start your first mock interview and your practice history will
                appear here.
              </p>

              <Link
                to="/interview"
                className="mt-4 inline-flex items-center rounded-lg bg-[#013364] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#081f38]"
              >
                Start Interview
                <ArrowRight size={15} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
