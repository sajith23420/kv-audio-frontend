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
]

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
    const [items, setItems] = useState(sampleArr)

    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                         items.map((product)=>{
                            console.log(product)
                            return(
                                <tr key={product.key} className="hover:bg-gray-200 cursor-pointer">
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Unavailable"}</td>
                                </tr>
                            )

                         })
                    }
                </tbody>

            </table>
            <Link to="/admin/items/add">
            <CiCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-red-600"/>
            </Link>
            
        </div>
    )
}