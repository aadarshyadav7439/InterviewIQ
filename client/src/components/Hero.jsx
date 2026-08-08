import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] px-6 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* left side ke components */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
            AI-Powered Interview Preparation
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Prepare Smarter.
            <br />
            Interview Better.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            Analyse your resume, practise realistic AI interviews, and get
            personalised feedback to improve your interview performance.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/signup" className="font-medium bg-black text-white rounded-lg px-6 py-3">
              Start Preparing
            </Link>
            
            <a href="#how-it-works" className="rounded-lg border px-6 py-3 font-medium">
              See How It Works
            </a>
          </div>
        </div>

        {/* right side ke components */}
        <div className="rounded-2xl border bg-gray-100 p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Interview Performance</p>
              <h2 className="text-2xl font-bold">Your Progress</h2>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              Improving
            </span>
          </div>

          <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Overall Score</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold">87</span>
              <span className="mb-1 text-2xl text-gray-500">/100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Communication</p>
              <p className="mt-2 text-2xl font-bold">91%</p>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Technical</p>
              <p className="mt-2 text-2xl font-bold">84%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
