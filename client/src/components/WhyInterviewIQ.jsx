const points = [
  {
    title: "Personalised Preparation",
    description: "InterviewIQ uses your resume, skills, projects, and target role to make your preparation relevant to you.",
  },
  {
    title:"Realistic Practice",
    description: "Instead of only reading questions, practise realistic interviews and experience the pressure of answering in real time.",
  },
  {
    title: "Actionable Feedback",
    description: "Understand what went wrong, what you did well, and what you should improve before your actual interview.",
  },
];

export default function WhyInterviewIQ(){
  return (
    <section className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider">
              Why InterviewIQ
            </p>

            <h2 className="mt-3 text-4xl font-bold leading-tight">
              Stop preparing for interviews blindly.
            </h2>

            <p className="mt-5 max-w-xl text-gray-600">
              Generic questions can only take you so far. InterviewIQ turns your own experience and goals into a personalised preparation experience.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {points.map((point, index) => (
              <div key={point.title} className="rounded-2xl border bg-white p-6">
                <div className="flex gap-4">
                  <span className="font-semibold text-gray-400"> 0{index + 1}</span>

                  <div>
                    <h3 className="text-xl font-semibold">{point.title}</h3>
                    <p className="mt-2 text-gray-600">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
