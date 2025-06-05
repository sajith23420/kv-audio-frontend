import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

    // Refactored: fetch orders function
    const refreshOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshOrders();
        // eslint-disable-next-line
    }, []);

    function handleOrderStatusChange(orderID, status) {
        setModalOpened(false);
        setActiveOrder(null);
        setTimeout(() => {
            const token = localStorage.getItem("token");
            axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderID}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then(() => {
                    window.location.reload(); // Force full page reload after status change
                })
                .catch((err) => {
                    console.error(err);
                    window.location.reload(); // Reload even on error to ensure UI is in sync
                });
        }, 200);
    }


    return (
        <div className="p-0 bg-gray-50 min-h-screen flex flex-col">
            <div className="bg-white/60 backdrop-blur-md px-8 py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-700 tracking-wide">Order Management</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-start w-full p-8">
                <div className="w-full max-w-6xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-white/60 backdrop-blur-md sticky top-0 z-10">
                            <tr>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider rounded-tl-2xl">Order ID</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider">Email</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider">Order Date</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider">Start Date</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider">End Date</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider">Days</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider">Total</th>
                                <th className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider rounded-tr-2xl">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12 text-gray-400 text-base">Loading orders...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12 text-gray-400 text-base">No orders found.</td>
                                </tr>
                            ) : (
                                orders.map((order, idx) => {
                                    const urlParams = new URLSearchParams(window.location.search);
                                    const highlight = urlParams.get('highlight');
                                    const isNew = (highlight === 'new' && order.status === 'Pending') || highlight === order.orderID;
                                    return (
                                        <tr
                                            key={order._id}
                                            className={`transition-all cursor-pointer ${isNew ? 'bg-yellow-100/80 animate-pulse' : 'hover:bg-white/80 hover:backdrop-blur-lg hover:scale-[1.01]'} ${idx % 2 === 0 ? 'bg-white/40' : 'bg-white/20'} border-b border-white/30 last:border-b-0`}
                                            style={{ boxShadow: isNew ? '0 0 0 2px #facc15' : undefined }}
                                            onClick={() => {
                                                setActiveOrder(order);
                                                setModalOpened(true);
                                            }}
                                        >
                                            <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{order.orderID}</td>
                                            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{order.email}</td>
                                            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{new Date(order.startingDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{new Date(order.endingDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{order.days}</td>
                                            <td className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap">Rs. {order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-4 py-1 text-xs font-bold rounded-2xl shadow-sm border border-white/40 ${order.status === "Approved"
                                                    ? "bg-blue-200/70 text-blue-700"
                                                    : order.status === "Rejected"
                                                        ? "bg-red-200/70 text-red-700"
                                                        : "bg-yellow-200/80 text-yellow-800 animate-pulse"
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {modalOpened && activeOrder && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center z-50">
                    <div className="w-full max-w-lg bg-white rounded-xl p-6 shadow-lg relative overflow-y-auto max-h-[90vh] animate-slide-down">
                        <IoMdCloseCircleOutline className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600" onClick={() => setModalOpened(false)} />
                        <h2 className="text-xl font-bold mb-4 text-center">Order Details</h2>
                        <div className="mb-1"><strong>Order ID:</strong> {activeOrder.orderID}</div>
                        <div className="mb-1"><strong>Email:</strong> {activeOrder.email}</div>
                        <div className="mb-1"><strong>Days:</strong> {activeOrder.days}</div>
                        <div className="mb-1"><strong>Start Date:</strong> {new Date(activeOrder.startingDate).toLocaleDateString()}</div>
                        <div className="mb-1"><strong>End Date:</strong> {new Date(activeOrder.endingDate).toLocaleDateString()}</div>
                        <div className="mb-1"><strong>Total Amount:</strong> Rs. {activeOrder.totalAmount.toFixed(2)}</div>
                        <div className="mb-1"><strong>Approval Status:</strong> {activeOrder.status}</div>
                        <div className="mb-1"><strong>Order Date:</strong> {new Date(activeOrder.orderDate).toLocaleDateString()}</div>
                        <div className="w-full flex justify-center items-center gap-2 mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-[90px]"
                                onClick={() => handleOrderStatusChange(activeOrder.orderID, "Approved")}
                            >
                                Approve
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-[90px]"
                                onClick={() => handleOrderStatusChange(activeOrder.orderID, "Rejected")}
                            >
                                Reject
                            </button>
                        </div>
                        <table className="w-full mt-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3 border-b"></th>
                                    <th className="text-left p-3 border-b">Product Key</th>
                                    <th className="text-left p-3 border-b">Product Name</th>
                                    <th className="text-left p-3 border-b">Qty</th>
                                    <th className="text-left p-3 border-b">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeOrder.orderItems.map((item) => (
                                    <tr key={item.product.key} className="hover:bg-gray-50 border-b">
                                        <td className="p-3"><img src={item.product.Image} className="w-[60px] h-[60px] object-cover rounded-lg border border-gray-200" /></td>
                                        <td className="p-3">{item.product.key}</td>
                                        <td className="p-3">{item.product.name}</td>
                                        <td className="p-3">{item.quantity}</td>
                                        <td className="p-3">Rs. {item.product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
