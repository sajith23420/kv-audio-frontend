import { FaTruck, FaDollarSign, FaClock } from "react-icons/fa";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section
                className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/audio1.jpg')" }}
            >
                {/* Dark overlay on background */}
                <div className="absolute inset-0 bg-black/50 z-0" />

                {/* Blurred translucent box */}
                <div className="relative z-10 max-w-3xl px-6 py-10 text-white bg-white/10 backdrop-blur-md rounded-xl text-center shadow-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Professional Gear for Exceptional Events
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                    KV Audio Rentals delivers premium sound and lighting equipment to elevate any event — from weddings to concerts. Count on our reliable gear and expert support to make your moments unforgettable.</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-[#4B3F97] font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
                            Book Now
                        </button>
                        <button className="border border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-[#4B3F97] transition">
                            See Reviews
                        </button>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-4">
                        <FaTruck className="text-3xl text-gray-700 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">WIDE RANGE OF PRODUCTS</h3>
                            <p className="text-sm text-gray-600">for daily use and events</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4">
                        <FaDollarSign className="text-3xl text-gray-700 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">SPECIAL RATES</h3>
                            <p className="text-sm text-gray-600">Special rates for more than 3 days or 3 items rent.</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-4">
                        <FaClock className="text-3xl text-gray-700 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">SUPPORT 365 x 24/7</h3>
                            <p className="text-sm text-gray-600">We do 365 x 9.00am – 5.00pm Online and Telephone Supports</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
