import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const token = localStorage.getItem("token")

    return (
        <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-accent text-white  ">

            <img src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover  absolute left-4  " />
            <div className="w-[600px] flex justify-evenly items-center">
            <Link to="/" className="hidden md:block text-[25px]  m-4">Home</Link>

            <Link to="/contact" className="hidden md:block text-[25px]  m-4">Contact</Link>

            <Link to="/gallery" className="hidden md:block text-[25px]  m-4">Gallery</Link>

            <Link to="/items" className="hidden md:block text-[25px]  m-4">Items</Link>

            <Link to="/booking" className="hidden md:block  text-[25px]  m-4 absolute right-24"><FaCartShopping/></Link>

            </div>


            <GiHamburgerMenu className="absolute right-5 text-[32px] md:hidden"
                onClick={() => {
                    setNavPanelOpen(true)
                }} />
            {token!=null&&<button className="hidden md:block absolute right-5 text-[24px] " onClick={()=>{
                localStorage.removeItem("token")
                window.location.href = "/login"
            }}>
                Logout
                </button>}


            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />

        </header>
    )
}