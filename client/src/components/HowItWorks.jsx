export default function HowItWorks(){
    return (
        <section id="how-it-works" className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
                {/* heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semifold uppercase tracking-wider">How It Works</p>
                    <h2 className="mt-3 text-4xl font-bold">From resume to interview-ready</h2>
                    <p className="mt-4 text-gray-600">InterviewIQ helps you prepare through a simple, personalised process.</p>
                </div>
                {/* flowcharT */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    <div className="rounded-2xl border p-6 bg-gray-50 shadow-sm">
                        <span className="text-sm font-semibold">01</span>
                        <h3 className="mt-4 text-xl font-semibold">Upload Your Resume</h3>
                        <p className="mt-3 text-gray-600">
                            Upload your resume and let InterviewIQ analyse your skills, projects and experience.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-6 bg-gray-50 shadow-sm">
                        <span className="text-sm font-semibold">02</span>
                        <h3 className="mt-4 text-xl font-semibold">Take an AI Interview</h3>
                        <p className="mt-3 text-gray-600">
                            Practise realistic interviews with questions personalised to your profile and target role.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-6 bg-gray-50 shadow-sm">
                        <span className="text-sm font-semibold">03</span>
                        <h3 className="mt-4 text-xl font-semibold">Get Personalised Feedback</h3>
                        <p className="mt-3 text-gray-600">
                           Review your performance and identify where you can actually improve. 
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}