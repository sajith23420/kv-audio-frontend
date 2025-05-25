import { useState, useEffect } from "react";
import { FaCartShopping, FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        function updateCartCount() {
            try {
                const cart = JSON.parse(localStorage.getItem("cart"));
                if (cart && cart.orderedItems) {
                    setCartCount(cart.orderedItems.reduce((sum, item) => sum + item.qty, 0));
                } else {
                    setCartCount(0);
                }
            } catch {
                setCartCount(0);
            }
        }
        updateCartCount();
        window.addEventListener("storage", updateCartCount);
        window.addEventListener("cartUpdated", updateCartCount);
        return () => {
            window.removeEventListener("storage", updateCartCount);
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

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
                            className="flex items-center gap-2 px-3 py-1.5 text-white border border-white rounded hover:bg-white hover:text-[#4B3F97] transition relative"
                        >
                            <FaCartShopping />
                            <span>Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{cartCount}</span>
                            )}
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
