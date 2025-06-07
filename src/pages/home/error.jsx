import { Link } from "react-router-dom";
import Footer from "../../components/Footer"; // Import the Footer component

export default function ErrorNotFound() {
    return (
        <>
            <section
                className="relative w-full min-h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/djman.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70 z-0" />

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 py-20 gap-12">
                    <div className="flex-1 flex flex-col justify-center text-white gap-10 min-w-[320px]">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg tracking-tight">404 Error: Page Not Found</h1>
                        <Link className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg mt-4 transition" to="/">Go back to Home</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
