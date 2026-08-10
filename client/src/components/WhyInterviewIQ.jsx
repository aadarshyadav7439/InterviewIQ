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
    <section className="border-y border-gray-200 bg-white px-6 py-24">
      <div className="mx-auto grid gap-14 lg:grid-cols-2 max-w-7xl lg:items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
              Why InterviewIQ
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Don't just practise.
              <br />
              Practise with purpose.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
              Generic questions can only take you so far. InterviewIQ turns your own experience and goals into a personalised preparation experience.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {points.map((point, index) => (
              <div key={point.title} className="rounded-2xl border border-gray-200 bg-[#fafafa] p-6 transition hover:translate-y-1 hover:border-[#013364]/20 hover:shadow-sm">
                <div className="flex gap-5">
                  <span className=" text-sm font-semibold text-[#013364]"> 0{index + 1}</span>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-950">{point.title}</h3>
                    <p className="mt-2 text-gray-600 leading-7">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
