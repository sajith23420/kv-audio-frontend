import { Link } from "react-router-dom";

export default function ErrorNotFound() {
    return (
        <div className="relative min-h-screen bg-gray-400 pt-[110px] pb-10 px-4 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-2xl mx-auto w-full bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg tracking-tight">404 Error: Page Not Found</h1>
                <Link className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg mt-4 transition" to="/">Go back to Home</Link>
            </div>
        </div>
    )
}