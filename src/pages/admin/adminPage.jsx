import { BsGraphDownArrow } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data;
        if (user.role == "admin") {
          setUserValidated(true);
          // Redirect to dashboard if on /admin or /admin/
          if (
            window.location.pathname === "/admin" ||
            window.location.pathname === "/admin/"
          ) {
            window.location.replace("/admin/dashboard");
          }
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setUserValidated(false);
      });
  }, []);

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
  ];

  return (
    <div className="w-full h-screen flex bg-gradient-to-tr from-green-50 via-white to-green-100">
      {/* Sidebar */}
      <div className="w-[240px] h-full bg-gradient-to-b from-green-400 to-green-600 shadow-2xl flex flex-col items-center py-8 relative">
        <div className="mb-10 flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full shadow-lg"
          />
          <span className="text-white text-2xl font-extrabold tracking-wide drop-shadow-lg">
            KV Audio
          </span>
        </div>
        <nav className="flex flex-col gap-2 w-full px-4">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              onClick={() => setActiveTab(link.key)}
              className={`flex items-center px-5 py-3 rounded-lg text-lg font-semibold transition-all duration-200 cursor-pointer
                ${activeTab === link.key
                  ? "bg-white text-green-700 shadow-md"
                  : "text-white hover:bg-green-500/70 hover:scale-[1.03]"
                }
              `}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-8 left-0 w-full flex justify-center">
          <span className="text-xs text-green-100 opacity-70">
            Admin Panel &copy; 2025
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen p-8 bg-gradient-to-tr from-white via-green-50 to-green-100 overflow-y-auto">
        {userValidated && (
          <Routes path="/*">
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit" element={<UpdateItemPage />} />
          </Routes>
        )}
        {!userValidated && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-green-400 border-dashed rounded-full animate-spin mb-4"></div>
            <span className="text-green-700 text-lg font-semibold">
              Validating admin access...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}