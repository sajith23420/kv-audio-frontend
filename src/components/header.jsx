import { useState } from "react";
import { FaCartShopping, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const token = localStorage.getItem("token");

    return (
        <header className="w-full h-[80px] fixed top-0 z-50 flex items-center justify-between px-9 bg-transparent backdrop-blur-md border-b border-white/30 text-white">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[60px] h-[60px] object-cover"
                />
                <p className="text-xl font-serif px-5">KV Audio Rentals</p>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex gap-11 text-[18px] justify-between items-center px-16">
                <Link to="/" className="m-2 hover:text-gray-300">Home</Link>
                <Link to="/contact" className="m-2 hover:text-gray-300">Contact</Link>
                <Link to="/gallery" className="m-2 hover:text-gray-300">Gallery</Link>
                <Link to="/items" className="m-2 hover:text-gray-300">Items</Link>
            </div>

            {/* Right-side Buttons */}
            <div className="hidden md:flex items-center gap-3">
                {token === null ? (
                    <>
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-3 py-1.5 text-white border border-white rounded hover:bg-white hover:text-[#4B3F97] transition"
                        >
                            <FaRightToBracket />
                            <span>Login</span>
                        </Link>

                        <Link
                            to="/register"
                            className="flex items-center gap-2 px-3 py-1.5 text-white border border-white rounded hover:bg-white hover:text-[#4B3F97] transition"
                        >
                            <FaUserPlus />
                            <span>Register</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/booking"
                            className="flex items-center gap-2 px-3 py-1.5 text-white border border-white rounded hover:bg-white hover:text-[#4B3F97] transition"
                        >
                            <FaCartShopping />
                            <span>Cart</span>
                        </Link>

                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 text-white border border-white rounded hover:bg-white hover:text-[#4B3F97] transition"
                        >
                            <FaRightToBracket className="rotate-180" />
                            <span>Logout</span>
                        </button>
                    </>
                )}
            </div>

            {/* Hamburger Menu (Mobile only) */}
            <GiHamburgerMenu
                className="md:hidden text-[32px]"
                onClick={() => setNavPanelOpen(true)}
            />

            {/* Mobile Nav Panel */}
            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
        </header>
    );
}
