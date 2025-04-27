import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
            .then((res) => {
                setProduct(res.data);
                setLoadingStatus("loaded");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                setLoadingStatus("error");
            });
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center px-2 md:px-8 py-4">
            {loadingStatus === "loading" && (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full" />
                </div>
            )}

            {loadingStatus === "loaded" && (
                <div className="w-full flex flex-col md:flex-row md:items-start justify-center gap-6">
                    {/* Product Title (Mobile only) */}
                    <h1 className="text-2xl font-bold text-accent text-center mt-14 md:hidden">
                        {product.name}
                    </h1>

                    {/* Image Section */}
                    <div className="w-full md:w-[50%] flex justify-center">
                        <ImageSlider images={product.Image} />
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-[50%] flex flex-col gap-4 mt-6 md:mt-0 md:pl-4">
                        <h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-800">{product.category} category</h2>
                        <p className="text-gray-800 text-justify">{product.description}</p>
                        <p className="text-lg text-green-500">Rs. {product.price?.toFixed(2)}</p>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Dimensions:</span> {product.dimensions}
                        </div>
                        <button
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 w-fit"
                            onClick={() => {
                                addToCart(product.key, 1);
                                console.log(loadCart());
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            {loadingStatus === "error" && (
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-accent">Error Occurred</h1>
                </div>
            )}
        </div>
    );
}
 