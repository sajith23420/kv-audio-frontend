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
        <div className="w-full h-full p-4 relative flex  flex-col items-center">
            {!itemsLoaded &&<div className="border-4 my-4 border-b-green-500 bg-0 w-[100px] h-[100px] rounded-full animate-spin"></div>}
            {itemsLoaded &&<div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded shadow-sm overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3 border-b">Key</th>
                            <th className="text-left p-3 border-b">Name</th>
                            <th className="text-left p-3 border-b">Price</th>
                            <th className="text-left p-3 border-b">Category</th>
                            <th className="text-left p-3 border-b">Dimensions</th>
                            <th className="text-left p-3 border-b">Availability</th>
                            <th className="text-left p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => (
                            <tr key={product.key} className="hover:bg-gray-50 border-b">
                                <td className="p-3">{product.key}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">${product.price}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.dimensions}</td>
                                <td className="p-3">{product.availability ? "Available" : "Unavailable"}</td>
                                <td className="p-3 border flex justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            navigate(`/admin/items/edit`, {state:product} )
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.key)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[70px] absolute right-4 bottom-4 text-gray-700 hover:text-red-600" />
            </Link>
        </div>
    );
}
