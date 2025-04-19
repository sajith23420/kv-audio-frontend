import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {

    return(
        <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-accent text-white  ">

            <img src="/logo.png" alt="Logo" className="w-[100px] h-[80px] object-cover  absolute left-2 " />

            <Link to="/" className="text-[25px] font-bold m-4">Home</Link>

            <Link to="/contact" className="text-[25px] font-bold m-4">Contact</Link>

            <Link to="/gallery" className="text-[25px] font-bold m-4">Gallery</Link>

            <Link to="/items" className="text-[25px] font-bold m-4">Items</Link>

            <Link to ="/booking" className="text-[25px] font-bold m-4 absolute right-3"><FaCartShopping/></Link>

        </header> 
    )
}