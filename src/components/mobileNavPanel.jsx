import { CiHome } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdContactPhone, MdHome } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel(props) {
    const isOpen = props.isOpen;
    const setOpen = props.setOpen;
    const navigate = useNavigate();

    function goTo(route) {
        navigate(route);
        setOpen(false);
    }

    return (
        <>
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-[#00000070] transition-opacity duration-300 z-50 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div
                    className={`h-full bg-white w-[300px] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="bg-accent w-full h-[100px] flex justify-center items-center relative">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-[80px] h-[80px] object-cover absolute left-2"
                        />
                        <IoMdClose
                            className="absolute right-3 text-3xl cursor-pointer"
                            onClick={() => setOpen(false)}
                        />
                    </div>
                    <div className="flex flex-col text-[20px] text-accent">
                        <div
                            onClick={() => goTo("/")}
                            className="flex items-center gap-2 p-3 hover:bg-accent/10 cursor-pointer"
                        >
                            <MdHome />
                            Home
                        </div>
                        <div
                            onClick={() => goTo("/contact")}
                            className="flex items-center gap-2 p-3 hover:bg-accent/10 cursor-pointer"
                        >
                            <MdContactPhone />
                            Contact
                        </div>
                        <div
                            onClick={() => goTo("/gallery")}
                            className="flex items-center gap-2 p-3 hover:bg-accent/10 cursor-pointer"
                        >
                            <MdPhotoLibrary />
                            Gallery
                        </div>
                        <div
                            onClick={() => goTo("/items")}
                            className="flex items-center gap-2 p-3 hover:bg-accent/10 cursor-pointer"
                        >
                            <FaBoxOpen />
                            Items
                        </div>
                        <div
                            onClick={() => goTo("/booking")}
                            className="flex items-center gap-2 p-3 hover:bg-accent/10 cursor-pointer"
                        >
                            <FaRegCalendarCheck />
                            Booking
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
