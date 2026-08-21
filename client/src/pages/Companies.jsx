import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Sparkles,
} from "lucide-react";
import { prepareCompany } from "../services/companyServices.js";

function Companies() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePrepare = async (event) => {
    event.preventDefault();

    if (!companyName.trim() || !targetRole.trim()) {
      setError("Please enter both company name and target role.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await prepareCompany(
        companyName.trim(),
        targetRole.trim(),
      );

      setCompany(data.company);
    } catch (err) {
      console.error("Company preparation error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to generate company preparation.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    navigate("/interview", {
      state: {
        company: company.companyName,
        targetRole: company.targetRole,
      },
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-8 sm:py-10">
      {/* HEADER */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#013364]">
          Company Preparation
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Know what to prepare before you interview.
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
          Enter a company and role to get a focused preparation guide based on
          what you should be ready to discuss.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handlePrepare}
        className="mt-8 border-y border-gray-200 py-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company
            </label>

            <div className="relative">
              <Building2
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Google"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>

            <div className="relative">
              <BriefcaseBusiness
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                placeholder="Software Engineer"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#013364] focus:ring-2 focus:ring-[#013364]/10"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="hidden text-xs text-gray-400 sm:block">
            Your guide is generated specifically for this company and role.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#013364] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles size={16} />
            {loading ? "Preparing..." : "Create preparation guide"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </form>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-3 py-10">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-[#013364]" />

          <div>
            <p className="text-sm font-medium text-gray-800">
              Preparing your guide...
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Looking at the role and identifying what matters most.
            </p>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {company && !loading && (
        <div className="mt-10">
          {/* COMPANY INTRO */}
          <section className="border-b border-gray-200 pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Preparation guide
            </p>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-950">
                {company.companyName}
              </h2>

              <span className="text-base text-gray-400">
                {company.targetRole}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
              {company.overview}
            </p>
          </section>

          {/* FOCUS + SKILLS */}
          <section className="grid gap-10 border-b border-gray-200 py-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013364]">
                Focus areas
              </p>

              <h3 className="mt-2 text-lg font-semibold text-gray-950">
                What you should spend time on
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {company.importantTopics?.map((topic, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-[#eef4fa] px-3 py-2 text-sm font-medium text-[#013364]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013364]">
                Key skills
              </p>

              <h3 className="mt-2 text-lg font-semibold text-gray-950">
                What you should be able to demonstrate
              </h3>

              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                {company.importantSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-600"
                  >
                    {skill}
                    {index < company.importantSkills.length - 1 && (
                      <span className="ml-3 text-gray-300">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* QUESTIONS */}
          <section className="border-b border-gray-200 py-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013364]">
                Practice
              </p>

              <h3 className="mt-2 text-xl font-semibold text-gray-950">
                Questions you should be ready for
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Use these as practice prompts before starting your mock
                interview.
              </p>
            </div>

            <div className="mt-7">
              {company.likelyQuestions?.map((question, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[48px_1fr] gap-4 border-t border-gray-100 py-5 first:border-t-0"
                >
                  <span className="text-sm font-semibold text-[#013364]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-7 text-gray-700 sm:text-base">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TIPS */}
          <section className="py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#013364]">
              Strategy
            </p>

            <h3 className="mt-2 text-xl font-semibold text-gray-950">
              How to prepare
            </h3>

            <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {company.preparationTips?.map((tip, index) => (
                <div key={index} className="flex gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-[#013364]"
                  />

                  <p className="text-sm leading-6 text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM CTA */}
          <section className="mt-2 border-t border-gray-200 pt-10 pb-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-950">
                  Ready to put this into practice?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Start a mock interview for {company.companyName} and see how
                  you perform.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartInterview}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#013364] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#081f38]"
              >
                Start mock interview
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Companies;