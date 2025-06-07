import { Link } from "react-router-dom";
import { FaTruck, FaDollarSign, FaHeadphones } from "react-icons/fa"; // Import icons

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section
                className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/djman.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#4B3F97]/80 to-[#2d1457]/90 z-0" />

                {/* Top Navbar */}
                <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-6 z-10">
                    <div className="text-3xl font-bold text-white tracking-widest">DJoz</div>
                    <ul className="flex gap-8 text-white/90 text-lg font-medium">
                        <li><Link to="/" className="border-b-2 border-white">HOME</Link></li>
                        <li><a href="#about">ABOUT</a></li>
                        <li><a href="#discography">DISCOGRAPHY</a></li>
                        <li><a href="#tours">TOURS</a></li>
                        <li><a href="#videos">VIDEOS</a></li>
                        <li><a href="#pages">PAGES</a></li>
                        <li><Link to="/contact">CONTACT</Link></li>
                    </ul>
                    <div className="flex gap-4 text-white text-xl">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-spotify"></i></a>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center mt-24">
                    <span className="uppercase tracking-widest text-white/80 text-sm mb-4">We made your</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-handwriting" style={{ fontFamily: 'cursive' }}>
                        EVENT MEMORABLE
                    </h1>
                    <p className="text-white/80 max-w-xl mb-8 text-lg">
                        KV Audio delivers powerful sound and dazzling lights for events of every size. Whether it's a small party or a large celebration, count on us to elevate your experience with reliable gear and professional service.                    </p>
                    <Link
                        to="/items"
                        className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#4B3F97] transition text-lg shadow-lg mt-4"
                    >
                        Book Now
                    </Link>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                        {/* Service Item 1: Model Training/Fine-tuning */}
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-database text-gray-500 mr-2 text-lg"></i>
                                <h3 className="text-xl font-semibold text-gray-800">Event Sound & Light Setup</h3>
                            </div>
                            <p className="text-gray-600">
                                Professional-grade audio and lighting systems tailored for events of all sizes – from private parties to large-scale functions.
                            </p>
                        </div>

                        {/* Service Item 2: AI Creative Creations */}
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-brain text-gray-500 mr-2 text-lg"></i>
                                <h3 className="text-xl font-semibold text-gray-800">Creative Audio-Visual Experiences</h3>
                            </div>
                            <p className="text-gray-600">
                                Immersive sound and lighting design that enhances mood, energy, and visual impact for unforgettable moments.
                            </p>
                        </div>

                        {/* Service Item 3: AI Transformation */}
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-sync-alt text-gray-500 mr-2 text-lg"></i>
                                <h3 className="text-xl font-semibold text-gray-800">Event Consulting & Planning Support</h3>
                            </div>
                            <p className="text-gray-600">
                                Expert advice, site checks, and planning assistance to ensure seamless integration of audio and lighting at your venue.
                            </p>
                        </div>

                        {/* Service Item 4: Multi-Model Task Automation */}
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-robot text-gray-500 mr-2 text-lg"></i>
                                <h3 className="text-xl font-semibold text-gray-800">Custom Packages & Equipment Rentals</h3>
                            </div>
                            <p className="text-gray-600">
                            Flexible rental options and packages to match your event’s scale, theme, and technical needs.                            </p>
                        </div>

                        {/* Service Item 5: AI Physical Systems */}
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-microchip text-gray-500 mr-2 text-lg"></i>
                                <h3 className="text-xl font-semibold text-gray-800">On-Site Technical Support</h3>
                            </div>
                            <p className="text-gray-600">
                            Skilled technicians available for setup, real-time operation, and breakdown – ensuring everything runs smoothly from start to finish.                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Features Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {/* Feature 1: Wide Range of Products */}
                        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                            <FaTruck className="text-5xl text-gray-700 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">WIDE RANGE OF PRODUCTS</h3>
                            <p className="text-gray-600">
                                for daily use and events
                            </p>
                        </div>

                        {/* Feature 2: Special Rates */}
                        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                            <FaDollarSign className="text-5xl text-gray-700 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">SPECIAL RATES</h3>
                            <p className="text-gray-600">
                                Special rates for more than 3 days or 3 items rent.
                            </p>
                        </div>

                        {/* Feature 3: Support 365 x 24/7 */}
                        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                            <FaHeadphones className="text-5xl text-gray-700 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">SUPPORT 365 x 24/7</h3>
                            <p className="text-gray-600">
                                We do 365 x 9.00am – 5.00pm Online and Telephone Supports
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-orange-400">KV Audio</h3>
                        <p className="text-gray-400 text-sm">
                            Your premier partner for unforgettable events. We provide top-tier sound and lighting solutions tailored to your needs.
                        </p>
                        <div className="flex gap-4 text-white text-xl mt-4">
                            <a href="#" className="hover:text-orange-400 transition-colors"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-orange-400 transition-colors"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-orange-400 transition-colors"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-orange-400 transition-colors"><i className="fab fa-spotify"></i></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
                            <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
                            <li><Link to="/items" className="hover:text-orange-400 transition-colors">Our Products</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 21.092a1.125 1.125 0 01-1.724 0l-6.6-7.425A7.5 7.5 0 1119.5 9.75c0 2.485-1.12 4.71-2.938 6.167l-1.2 1.05a.75.75 0 01-1.05 0l-1.2-1.05A7.5 7.5 0 0112 21.75c0-.414.336-.75.75-.75h1.5c.414 0 .75.336.75.75z" />
                                </svg>
                                121 Rock Sreet, 21 Avenue, Colombo , Sri Lanka
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.086c.51 0 .998.195 1.366.547l2.21 2.11a2.25 2.25 0 01.668 1.602v2.086a2.25 2.25 0 01-.668 1.602l-1.11 1.11a16.012 16.012 0 006.364 6.364l1.11-1.11a2.25 2.25 0 011.602-.668h2.086a2.25 2.25 0 012.25 2.25v2.086c0 1.243-1.007 2.25-2.25 2.25h-.75C6.477 21.75 2.25 17.523 2.25 12.75v-.75z" />
                                </svg>
                                94 11 700 300, 94 11 700 400
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                info@kvaudio.com
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-6">
                    &copy; {new Date().getFullYear()} KV Audio. All rights reserved.
                </div>
            </footer>
        </>
    );
}
