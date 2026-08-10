const features = [
    {
        number : "01",
        title : "Resume Analysis",
        description : "Upload your resume and let InterviewIQ analyse your skills, projects, experience, and strengths.",
    },
    {
        number: "02",
        title: "AI Voice Interviews",
        description: "Practise realistic interviews with an AI interviewer that asks questions based on your profile.",
    },
    {
        number: "03",
        title: "Company-Specific Questions",
        description: "Prepare for your target companies with interview questions tailored to specific roles and companies.",
    },
    {
        number: "04",
        title: "Performance Reports",
        description: "Get detailed feedback on your communication, technical knowledge, confidence, and overall performance.",
    },
    {
    number: "05",
    title: "Personalised Feedback",
    description: "Receive actionable feedback instead of simply getting a score at the end of your interview.",

    },
    {
    number: "06",
    title: "Community",
    description: "Connect with other candidates, share experiences, discuss interviews, and learn from the community.",
    },
]
export default function Features(){
    return(
        <section id="features" className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
                {/* sectional heading */}
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#013364]">
                        Features
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Everything you need to prepare with confidence.</h2>
                    <p className="mt-5 text-lg leading-8 text-gray-600">InterviewIQ brings your entire interview preparation process into one intelligent platform.</p>
                </div>

                {/* feature cards */}
                <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature)=>(
                        <div key={feature.number}
                            className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:translate-y-1 hover:border-[#013364]/20 hover:shadow-sm">
                            <span className="text-sm font-semibold text-[#013364]">{feature.number}</span>
                            <h3 className="mt-7 text-xl font-semibold text-gray-950">{feature.title}</h3>
                            <p className="mt-3 leading-7 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}