import { Link } from "react-router-dom";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaRegBookmark, FaRegUser, FaBell } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import InquiriesIcon from "./inquiriesIcon";
import { useState, useEffect } from "react";

export default function AdminMobileNavPanel({ activeTab, setActiveTab, onClose }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true); // Trigger slide-in animation on mount
    }, []);

    const handleClose = () => {
        setIsOpen(false); // Trigger slide-out animation
        setTimeout(onClose, 300); // Call parent's onClose after animation
    };

    const navLinks = [
        {
            name: "Dashboard",
            icon: <BsGraphDownArrow className="mr-3" />,
            to: "/admin/dashboard",
            key: "dashboard",
        },
        {
            name: "Orders",
            icon: <FaRegBookmark className="mr-3" />,
            to: "/admin/orders",
            key: "orders",
        },
        {
            name: "Items",
            icon: <MdOutlineSpeaker className="mr-3" />,
            to: "/admin/items",
            key: "items",
        },
        {
            name: "Users",
            icon: <FaRegUser className="mr-3" />,
            to: "/admin/users",
            key: "users",
        },
        {
            name: "Inquiries",
            icon: <IoMdNotificationsOutline className="mr-3" />,
            to: "/admin/inquiries",
            key: "inquiries",
        },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={handleClose}
            ></div>

            {/* Mobile Nav Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-md text-gray-800 flex flex-col py-6 px-2 z-50 transform transition-transform ease-in-out duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-700 text-3xl focus:outline-none"
                >
                    &times;
                </button>
                <nav className="flex flex-col gap-4 text-center mt-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            to={link.to}
                            onClick={() => {
                                setActiveTab(link.key);
                                handleClose();
                            }}
                            className={`flex items-center justify-center px-6 py-3 rounded-lg text-xl font-medium transition-all duration-200 cursor-pointer
                                ${activeTab === link.key
                                    ? "bg-gray-200 text-orange-600"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    <button
                        className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded font-semibold text-xl mt-4"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </>
    );
}
