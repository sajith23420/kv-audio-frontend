import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const sampleArr = [
    {
        key: "P001",
        name: "Wireless Mouse",
        price: 25.99,
        category: "Electronics",
        dimensions: "4.5 x 2.5 x 1.5 inches",
        description: "A smooth and responsive wireless mouse with ergonomic design.",
        availability: true,
        Image: ["https://example.com/wireless-mouse.jpg"]
    },
    {
        key: "P002",
        name: "Bluetooth Headphones",
        price: 49.99,
        category: "Electronics",
        dimensions: "7 x 6 x 3 inches",
        description: "Over-ear noise-canceling Bluetooth headphones with long battery life.",
        availability: true,
        Image: ["https://example.com/bluetooth-headphones.jpg"]
    },
    {
        key: "P003",
        name: "Coffee Mug",
        price: 12.99,
        category: "Kitchenware",
        dimensions: "4 x 3.5 x 3 inches",
        description: "A stylish ceramic coffee mug with a comfortable grip.",
        availability: true,
        Image: ["https://example.com/coffee-mug.jpg"]
    },
    {
        key: "P004",
        name: "Smartphone Stand",
        price: 15.99,
        category: "Accessories",
        dimensions: "5 x 3 x 2 inches",
        description: "Adjustable smartphone stand for hands-free viewing.",
        availability: true,
        Image: ["https://example.com/smartphone-stand.jpg"]
    },
    {
        key: "P005",
        name: "Notebook",
        price: 8.99,
        category: "Stationery",
        dimensions: "8.5 x 11 inches",
        description: "A hardcover notebook with 200 ruled pages.",
        availability: true,
        Image: ["https://example.com/notebook.jpg"]
    }
];

export default function AdminItemsPage() {
    const [items, setItems] = useState(sampleArr);
    const [itemsLoaded, setItemsLoaded] = useState(false); // State to track if items are loaded
    const navigate = useNavigate();

    useEffect(() => {

        if (!itemsLoaded) {
            const token = localStorage.getItem("token");
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    console.log(res.data);
                    setItems(res.data);
                    setItemsLoaded(true); // Reset itemsLoaded to false after fetching
                })
                .catch((err) => {
                    console.error(err);
                });


        }

    }, [itemsLoaded]); // Add itemsLoaded to the dependency arra

    const handleEdit = (key) => {
        navigate(`/admin/items/edit/${key}`);
    };

    const handleDelete = (key) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            setItems(prev => prev.filter(item => item.key !== key));
            const token = localStorage.getItem("token");
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    console.log(res.data);
                    setItemsLoaded(false); // Toggle itemsLoaded to trigger useEffect
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <div className="p-0 bg-gray-50 min-h-screen flex flex-col">
            <div className="bg-white/60 backdrop-blur-md px-8 py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-700 tracking-wide">Items Management</h1>
                <Link to="/admin/items/add" className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
                    <CiCirclePlus className="text-2xl" /> Add Item
                </Link>
            </div>
            <div className="flex-1 flex flex-col items-center justify-start w-full p-8">
                <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Image</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Key</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Name</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Price</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Category</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Dimensions</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Availability</th>
                                <th className="text-left p-3 border-b text-xs text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!itemsLoaded ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-8 text-gray-400 text-base">Loading items...</td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-8 text-gray-400 text-base">No items found.</td>
                                </tr>
                            ) : (
                                items.map((product, idx) => (
                                    <tr key={product.key} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-orange-50 transition-all`}>
                                        <td className="p-3">
                                            <img src={product.Image?.[0]} alt={product.name} className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm" />
                                        </td>
                                        <td className="p-3 text-sm">{product.key}</td>
                                        <td className="p-3 text-sm font-medium text-gray-700">{product.name}</td>
                                        <td className="p-3 text-sm">${product.price}</td>
                                        <td className="p-3 text-sm">{product.category}</td>
                                        <td className="p-3 text-sm">{product.dimensions}</td>
                                        <td className="p-3 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.availability ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{product.availability ? 'Available' : 'Unavailable'}</span>
                                        </td>
                                        <td className="p-3 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    navigate(`/admin/items/edit`, { state: product })
                                                }}
                                                className="bg-gray-700 hover:bg-gray-900 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.key)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
