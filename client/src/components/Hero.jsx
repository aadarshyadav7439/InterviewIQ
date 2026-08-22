import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left side */}
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
            AI-powered interview preparation
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
            Prepare smarter.
            <br />
            <span className="text-[#013364]">Interview better.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
            Analyse your resume, practise realistic interviews, and get
            personalised feedback to become more confident before your next
            interview.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-lg bg-[#013364] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#081f38]"
            >
              Start Preparing
            </Link>

            <a
              href="#how-it-works"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 transition hover:border-[#013364]/30 hover:bg-gray-50"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#013364]" />
              Resume analysis
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#013364]" />
              AI interviews
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#013364]" />
              Personalised feedback
            </span>
          </div>
        </div>

        {/* Right side - Sample Preview */}
        <div className="lg:pl-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-7">
            {/* Preview header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Sample Interview Performance
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-950">
                  See your progress
                </h2>
              </div>

              <span className="rounded-full border border-[#013364]/15 bg-[#eef4fa] px-3 py-1 text-xs font-medium text-[#013364]">
                Sample
              </span>
            </div>

            {/* Score */}
            <div className="mt-7 rounded-2xl bg-gray-50 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overall Score</p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-bold tracking-tight text-[#013364]">
                      87
                    </span>

                    <span className="mb-1 text-sm text-gray-500">/100</span>
                  </div>
                </div>

                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>

              {/* Progress bar */}
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[87%] rounded-full bg-[#013364]" />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500">Communication</p>

                <p className="mt-2 text-2xl font-semibold text-gray-950">
                  91%
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500">Technical</p>

                <p className="mt-2 text-2xl font-semibold text-gray-950">
                  84%
                </p>
              </div>
            </div>

            {/* Recent feedback */}
            <div className="mt-4 rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-medium text-gray-950">
                Sample feedback
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Strong technical answers. Work on giving more structured
                responses during behavioural questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}