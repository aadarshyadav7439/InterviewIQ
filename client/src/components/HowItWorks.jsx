const steps = [
  {
    number: "01",
    title: "Upload your resume",
    description: "Give InterviewIQ your resume so it can understand your skills, experience, and projects.",
  },
  {
    number: "02",
    title: "Take an AI interview",
    description: "Practise a realistic interview with questions tailored to your profile and target role.",
  },
  {
    number: "03",
    title: "Get personalised feedback",
    description: "Review your performance, identify weak areas, and understand exactly what you can improve.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-gray-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
            How it works
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            From your resume to interview-ready.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            InterviewIQ turns your existing experience into a personalised
            interview preparation process.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}
              className="rounded-2xl border border-gray-200 bg-[#fafafa] p-7 transition hover:-translate-y-1 hover:border-[#013364]/20 hover:shadow-sm">
              
              <span className="text-sm font-semibold text-[#013364]">{step.number}</span>

              <h3 className="mt-8 text-xl font-semibold text-gray-950">{step.title}</h3>

              <p className="mt-3 leading-7 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}