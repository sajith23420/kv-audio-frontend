import { BsGraphDownArrow } from "react-icons/bs";
import { FaRegBookmark, FaRegUser, FaBell } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminDashboard from "./adminDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import InquiriesIcon from "../../components/inquiriesIcon";
import Inquiries from "./inquiries.jsx"; // Import Inquiries component with extension
import AdminMobileNavPanel from "../../components/adminMobileNavPanel"; // Import the new component
import { HiMenuAlt3 } from "react-icons/hi"; // Import an icon for the mobile menu

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [activeTab, setActiveTab] = useState(
    window.location.pathname.split("/").pop() || "dashboard"
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [newOrders, setNewOrders] = useState([]);
  const [notifCount, setNotifCount] = useState(0);
  const [showMobileNav, setShowMobileNav] = useState(false); // New state for mobile nav

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

  // Fetch new orders for notification
  useEffect(() => {
    async function fetchNewOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Consider orders with status 'Pending' as new
        const pending = res.data.filter(o => o.status === 'Pending');
        setNewOrders(pending);
        setNotifCount(pending.length);
      } catch { }
    }
    fetchNewOrders();
    const interval = setInterval(fetchNewOrders, 10000); // Poll every 10s
    return () => clearInterval(interval);
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
    {
      name: "Inquiries",
      icon: <IoMdNotificationsOutline className="mr-3" />,
      to: "/admin/inquiries",
      key: "inquiries",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Top Bar */}
      <div className="w-full h-14 bg-white/30 backdrop-blur-md flex items-center justify-between px-6 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-700 text-2xl mr-2"
            onClick={() => setShowMobileNav(true)}
          >
            <HiMenuAlt3 />
          </button>
          <span className="font-bold text-lg text-gray-700">KV Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin/inquiries">
            <InquiriesIcon />
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowNotif((v) => !v)}
              className="relative focus:outline-none"
            >
              <FaBell className="text-2xl text-gray-700" />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{notifCount}</span>
              )}
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-2 w-45 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b font-semibold text-gray-700 flex justify-between items-center">
                  New Orders
                  <button className="text-xs text-blue-500 hover:underline" onClick={() => {
                    setShowNotif(false);
                    setActiveTab('orders');
                    window.location.href = '/admin/orders?highlight=new';
                  }}>View All</button>
                </div>
                {newOrders.length === 0 ? (
                  <div className="p-4 text-gray-400 text-sm">No new orders</div>
                ) : (
                  <ul className="max-h-60 overflow-y-auto">
                    {newOrders.map(order => (
                      <li key={order._id} className="px-4 py-2 hover:bg-orange-50 border-b cursor-pointer" onClick={() => {
                        setShowNotif(false);
                        setActiveTab('orders');
                        window.location.href = `/admin/orders?highlight=${order.orderID}`;
                      }}>
                        <div className="font-semibold text-gray-700">Order #{order.orderID}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
                        <div className="text-xs text-gray-400">{new Date(order.orderDate).toLocaleString()}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded font-semibold"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-800 text-white flex-col py-6 px-2 h-full hidden md:flex"> {/* Added hidden md:flex */}
          <nav className="flex flex-col gap-2 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                onClick={() => setActiveTab(link.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer
                  ${activeTab === link.key
                    ? "bg-gray-900 text-orange-400"
                    : "hover:bg-gray-700"
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto text-xs text-gray-400 text-center pt-8">
            designed by freepik.com
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {userValidated ? (
            <Routes path="/*">
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/items" element={<AdminItemsPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/items/add" element={<AddItemPage />} />
              <Route path="/items/edit" element={<UpdateItemPage />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/inquiries" element={<Inquiries />} />
            </Routes>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-orange-400 border-dashed rounded-full animate-spin mb-4"></div>
              <span className="text-orange-700 text-lg font-semibold">
                Validating admin access...
              </span>
            </div>
          )}
        </main>
      </div>
      {showMobileNav && (
        <AdminMobileNavPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setShowMobileNav(false)}
        />
      )}
    </div>
  );
}
