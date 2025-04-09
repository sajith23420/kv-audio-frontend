import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";



export default function UpdateItemPage() {

    const location = useLocation();

    console.log(location)

    const [productKey, setProductKey] = useState(location.state.key);
    const [productName, setProductName] = useState(location.state.name);
    const [productPrice, setProductPrice] = useState(location.state.price.toString());
    const [productCategory, setProductCategory] = useState(location.state.category);
    const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
    const [productDescription, setProductDescription] = useState(location.state.description);
    const navigate = useNavigate()


    async function handleAddItem() {
        console.log(productKey, productName, productPrice, productCategory, productDimensions, productDescription);

        const token = localStorage.getItem("token");
        if (token) {
            try {

                const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`, {
                    key: productKey,
                    name: productName,
                    price: productPrice,
                    category: productCategory,
                    dimensions: productDimensions,
                    description: productDescription,

                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                }
                );
                toast.success(result.data.message);
                navigate("/admin/items");


            } catch (err) {

                toast.error(err.response.data.error);
            }

        } else {
            toast.error("Please login first");
        }

    }




    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Update Item</h1>
            <div className="w-[400px] bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-4">
                <input
                    disabled
                    type="text"
                    placeholder="Product Key"
                    value={productKey}
                    onChange={(e) => setProductKey(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Category</option>
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>
                <input
                    type="text"
                    placeholder="Product Dimensions"
                    value={productDimensions}
                    onChange={(e) => setProductDimensions(e.target.value)}
                    className="w-full
                     p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    type="text"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={handleAddItem} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all">Update</button>

                <button onClick={() => { navigate("/admin/items") }} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all">Cancel</button>
            </div>
        </div>
    );
}