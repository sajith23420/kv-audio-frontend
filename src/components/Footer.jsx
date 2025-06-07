import { Link } from "react-router-dom";

export default function Footer() {
    return (
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
    );
}
