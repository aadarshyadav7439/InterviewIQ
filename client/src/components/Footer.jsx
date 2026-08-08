export default function Footer(){
    return (
        <footer className="border-t px-6 py-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-bold">InterviewIQ</h2>
                    <p className="mt-1 text-sm text-gray-500">AI-powered interview preparation.</p>
                </div>
                <div className="flex gap-6 text-sm text-gray-600">
                    <a href="/"  className="hover:text-black">Home</a>
                    <a href="/companies" className="hover:text-black">Companies</a>
                    <a href="/community" className="hover:text-black">Community</a>
                    <a href="/login" className="hover:text-black">Login</a>
                </div>

                <p className="text-sm text-gray-500">© 2026 InterviewIQ</p>
            </div>
        </footer>
    );
}