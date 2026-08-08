export default function CTA(){
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-5xl rounded-3xl bg-black px-8 py-16 text-white md:px-16">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Start Preparing Today
                </p>

                <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
                    Turn your interview preparation
                    <br />
                    into your competitive advantage.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-gray-300">
                    Analyse your resume, practise realistic AI interviews, and get personalised feedback to become more confident before your next interview.
                </p>

                <a href="/signup" className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200">
                    Start Preparing
                </a>
            </div>
        </section>
    );
}