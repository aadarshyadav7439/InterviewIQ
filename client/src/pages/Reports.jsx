import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import { getReports } from "../services/reportServices.js";

function Reports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getReports();
        setReports(data);
      } catch (err) {
        console.error("GET REPORTS ERROR:", err);

        setError(err.response?.data?.message || "Unable to load your reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const summary = reports?.summary;

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm text-gray-500">Loading your reports...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
      {/* HEADER */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#013364]">
          Reports
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Track how you're improving.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Review your interview performance, identify your progress, and see
          where you should focus next.
        </p>
      </div>

      {/* EMPTY STATE */}
      {summary?.totalCompleted === 0 && (
        <section className="mt-12 border-t border-gray-200 py-12">
          <div className="max-w-xl">
            <ClipboardCheck size={30} className="text-[#013364]" />

            <h2 className="mt-5 text-xl font-semibold text-gray-950">
              No completed interviews yet
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Complete your first mock interview to start tracking your
              performance and progress.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#013364] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#081f38]"
            >
              Start an interview
              <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
      )}

      {/* REPORT CONTENT */}
      {summary?.totalCompleted > 0 && (
        <>
          {/* SUMMARY */}
          <section className="mt-10 grid border-y border-gray-200 sm:grid-cols-3">
            <div className="py-6 sm:border-r sm:border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <BarChart3 size={17} />
                <span className="text-sm">Average score</span>
              </div>

              <p className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
                {summary.averageScore}
                <span className="text-lg font-medium text-gray-400">/100</span>
              </p>
            </div>

            <div className="py-6 sm:px-8 sm:border-r sm:border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <ClipboardCheck size={17} />
                <span className="text-sm">Completed interviews</span>
              </div>

              <p className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
                {summary.totalCompleted}
              </p>
            </div>

            <div className="py-6 sm:pl-8">
              <div className="flex items-center gap-2 text-gray-500">
                <Award size={17} />
                <span className="text-sm">Best score</span>
              </div>

              <p className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
                {summary.bestScore}
                <span className="text-lg font-medium text-gray-400">/100</span>
              </p>
            </div>
          </section>

          {/* PERFORMANCE TREND */}
          <section className="border-b border-gray-200 py-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013364]">
                  Performance
                </p>

                <h2 className="mt-2 text-xl font-semibold text-gray-950">
                  Recent performance
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Your scores across completed interviews.
                </p>
              </div>

              <TrendingUp size={22} className="text-[#013364]" />
            </div>

            <div className="mt-8 flex items-end gap-3">
              {reports.performanceTrend.slice(-10).map((item) => (
                <div
                  key={item.interviewId}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <div className="relative flex h-48 w-full items-end rounded-t-md bg-gray-100">
                    <div
                      style={{ height: `${item.score}%` }}
                      className="w-full rounded-t-md bg-[#013364] transition-all"
                      title={`${item.score}/100`}
                    />
                  </div>

                  <span className="text-xs font-medium text-gray-500">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-400">
              <span>Older</span>
              <span>Recent</span>
            </div>
          </section>

          {/* RECENT INTERVIEWS */}
          <section className="py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013364]">
              History
            </p>

            <h2 className="mt-2 text-xl font-semibold text-gray-950">
              Recent interviews
            </h2>

            <div className="mt-6 divide-y divide-gray-100 border-y border-gray-200">
              {reports.recentInterviews.map((interview) => (
                <button
                  key={interview._id}
                  onClick={() => navigate(`/interview-report/${interview._id}`)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {interview.company}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {interview.targetRole} · {interview.interviewType}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-950">
                        {interview.overallScore}/100
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(interview.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <ArrowUpRight size={18} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Reports;
