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
    title: "Community",
    description: "Connect with other candidates, share experiences, discuss interviews, and learn from the community.",
    },
]
export default function Features(){
    return(
        <section className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
                {/* sectional heading */}
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wider">
                        Features
                    </p>
                    <h2 className="mt-3 text-4xl font-bold">Everything you need to prepare with confidence.</h2>
                    <p className="mt-4 text-gray-600">InterviewIQ brings your entire interview preparation process into one intelligent platform.</p>
                </div>

                {/* feature cards */}
                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature)=>(
                        <div key={feature.number}
                            className="rounded-2xl border p-6 transition hover:shadow-md">
                            <span className="text-sm font-semibold text-gray-400">{feature.number}</span>
                            <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-3 leading-relaxed text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}