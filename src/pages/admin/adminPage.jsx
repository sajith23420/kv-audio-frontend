import { BsGraphDownArrow } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[200px] h-full bg-green-200">
        <button className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center">
          <BsGraphDownArrow/>
          Dashboard
        </button>
        <a href="/admin/bookings" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <FaRegBookmark/>
          Bookings
        </a>
        <a href="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <MdOutlineSpeaker/>
          Items
        </a>
        <a href="/admin/Users" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <FaRegUser/>
          Users
        </a>
      </div>

      <div className='w-[calc(100vw-200px)] '>  
        <Routes path="/*">
        <Route path="/bookings" element={<h1>Bookings</h1>}/>
        <Route path="/items" element={<AdminItemsPage/>}/>
        <Route path="/Users" element={<h1>Users</h1>} />
        <Route path="/items/add" element={<AddItemPage/>} />
        </Routes>
       
       </div>
      

      </div>
    

  )
}