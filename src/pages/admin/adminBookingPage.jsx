import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
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
                console.log(res.data);
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        if (loading) {
            fetchOrders();
        }
    }, [loading]);

    function handleOrderStatusChange(orderID, status) {
        const token = localStorage.getItem("token");

        axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderID}`,
            {
                status: status,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(() => {
            console.log("Order status updated");
            setModalOpened(false);
            setLoading(true);
        }).catch((err) => {
            console.error(err);
            setLoading(true);
        })
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>

            {loading ? (
                <p className="text-gray-600">Loading orders...</p>
            ) : (
                <div className="overflow-x-auto">
                    <div className="shadow-lg rounded-xl overflow-hidden">
                        <table className="min-w-full text-sm bg-white">
                            <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                                <tr>
                                    <th className="text-left px-6 py-3 font-semibold">Order ID</th>
                                    <th className="text-left px-6 py-3 font-semibold">Email</th>
                                    <th className="text-left px-6 py-3 font-semibold">Order Date</th>
                                    <th className="text-left px-6 py-3 font-semibold">Start Date</th>
                                    <th className="text-left px-6 py-3 font-semibold">End Date</th>
                                    <th className="text-left px-6 py-3 font-semibold">Days</th>
                                    <th className="text-left px-6 py-3 font-semibold">Total</th>
                                    <th className="text-left px-6 py-3 font-semibold">Approved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className={`border-b  'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all cursor-pointer`}
                                        onClick={() => {
                                            setActiveOrder(order);
                                            setModalOpened(true);
                                        }}
                                    >
                                        <td className="px-6 py-4 text-gray-700">{order.orderID}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.email}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(order.startingDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(order.endingDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{order.days}</td>
                                        <td className="px-6 py-4 text-gray-600">Rs. {order.totalAmount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status == "Approved"
                                                ? "bg-green-100 text-green-600"
                                                : order.status === "Rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {
                modalOpened && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center">
                        <div className="w-[500px] bg-white rounded-lg p-3 shadow-lg relative overflow-y-auto max-h-[90vh] animate-slide-down">
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
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-[90px]"
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
                                            <td className="p-3"><img src={item.product.Image} className="w-[80px] h-[80px] object-cover" /></td>
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
                )
            }
        </div>
    );
}
