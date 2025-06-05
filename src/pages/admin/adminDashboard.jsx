import { useEffect, useState } from "react";
import axios from "axios";
import {
    Bar,
    Line,
    Pie,
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: 0,
        items: 0,
        orders: 0,
        revenue: 0,
        ordersPerMonth: [],
        revenuePerMonth: [],
        topItems: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const token = localStorage.getItem("token");
                const [usersRes, itemsRes, ordersRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                const users = usersRes.data;
                const items = itemsRes.data;
                const orders = ordersRes.data;
                // Calculate revenue and monthly stats
                let revenue = 0;
                const ordersPerMonth = Array(12).fill(0);
                const revenuePerMonth = Array(12).fill(0);
                const itemCount = {};
                orders.forEach((order) => {
                    const date = new Date(order.orderDate);
                    const month = date.getMonth();
                    ordersPerMonth[month]++;
                    revenuePerMonth[month] += order.totalAmount;
                    revenue += order.totalAmount;
                    order.orderItems.forEach((item) => {
                        itemCount[item.product.key] = (itemCount[item.product.key] || 0) + item.quantity;
                    });
                });
                // Top 5 items
                const topItems = Object.entries(itemCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([key, count]) => {
                        const prod = items.find((i) => i.key === key);
                        return { name: prod?.name || key, count };
                    });
                setStats({
                    users: users.length,
                    items: items.length,
                    orders: orders.length,
                    revenue,
                    ordersPerMonth,
                    revenuePerMonth,
                    topItems,
                });
            } catch (err) {
                // eslint-disable-next-line
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return (
        <div className="w-full min-h-screen flex flex-col gap-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Dashboard</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-orange-400 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-xl font-bold text-gray-800">{stats.users}</span>
                            <span className="text-gray-500 mt-2 text-xs">Users</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-xl font-bold text-gray-800">{stats.items}</span>
                            <span className="text-gray-500 mt-2 text-xs">Items</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-xl font-bold text-gray-800">{stats.orders}</span>
                            <span className="text-gray-500 mt-2 text-xs">Orders</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-xl font-bold text-gray-800">Rs. {stats.revenue.toLocaleString()}</span>
                            <span className="text-gray-500 mt-2 text-xs">Revenue</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-base font-semibold mb-4 text-gray-700">Orders Per Month</h2>
                            <Bar
                                data={{
                                    labels: months,
                                    datasets: [
                                        {
                                            label: "Orders",
                                            data: stats.ordersPerMonth,
                                            backgroundColor: "#f59e42",
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                    },
                                }}
                            />
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-[380px]">
                            <h2 className="text-base font-semibold mb-4 text-gray-700">Top 5 Rented Items</h2>
                            <div className="w-full h-[350px] md:h-[260px]">
                                <Pie
                                    data={{
                                        labels: stats.topItems.map((i) => i.name),
                                        datasets: [
                                            {
                                                label: "Rented Count",
                                                data: stats.topItems.map((i) => i.count),
                                                backgroundColor: [
                                                    "#f59e42",
                                                    "#fde68a",
                                                    "#fdba74",
                                                    "#fbbf24",
                                                    "#f97316",
                                                ],
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { position: "bottom" },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 mt-8 max-w-xl">
                        <h2 className="text-base font-semibold mb-4 text-gray-700">Revenue Per Month</h2>
                        <Line
                            data={{
                                labels: months,
                                datasets: [
                                    {
                                        label: "Revenue",
                                        data: stats.revenuePerMonth,
                                        borderColor: "#f59e42",
                                        backgroundColor: "#fde68a",
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
