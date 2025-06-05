import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("0");
    const [productCategory, setProductCategory] = useState("");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState();
    const navigate = useNavigate()

    async function handleAddItem() {

        const promises = [];

        for (let i = 0; i < productImage.length; i++) {
            console.log(productImage[i])
            const promise = mediaUpload(productImage[i])
            promises.push(promise);
            // if(i == 5){
            //     toast.error("You can only upload 5 images");
            //     break;
            // }
        }


        console.log(productKey,
            productName,
            productPrice,
            productCategory,
            productDimensions,
            productDescription);

        const token = localStorage.getItem("token");
        if (token) {
            try {

                // Promise.all(promises).then((result) => {
                //     console.log(result)

                // }).catch((err) => {
                //     toast.error(err)
                // })

                const imageUrls = await Promise.all(promises);

                const result = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                    key: productKey,
                    name: productName,
                    price: productPrice,
                    category: productCategory,
                    dimensions: productDimensions,
                    description: productDescription,
                    Image: imageUrls,

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
        <div className="p-0 bg-gray-50 min-h-screen flex flex-col">
            <div className="bg-white/60 backdrop-blur-md px-8 py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-700 tracking-wide">Add Item</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center w-full p-8">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
                    <input
                        type="text"
                        placeholder="Product Key"
                        value={productKey}
                        onChange={(e) => setProductKey(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400 bg-gray-50"
                    />
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400 bg-gray-50"
                    />
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400 bg-gray-50"
                    />
                    <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400 bg-gray-50"
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
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400 bg-gray-50"
                    />
                    <textarea
                        type="text"
                        placeholder="Product Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400 bg-gray-50"
                    />
                    <input type="file" multiple onChange={(e) => { setProductImage(e.target.files) }} className="w-full p-2 border rounded bg-gray-50" />
                    <div className="flex w-full gap-3 mt-2">
                        <button onClick={handleAddItem} className="flex-1 bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition-all font-semibold">Add</button>
                        <button onClick={() => { navigate('/admin/items') }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-all font-semibold">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}