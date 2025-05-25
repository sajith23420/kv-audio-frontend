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
        <div className="relative min-h-screen bg-gray-400 pt-[110px] pb-10 px-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-7xl mx-auto">
                {loadingStatus === "loading" && (
                    <div className="w-full h-[400px] flex justify-center items-center">
                        <div className="w-[70px] h-[70px] border-b-4 border-b-white animate-spin rounded-full bg-white/10" />
                    </div>
                )}

                {loadingStatus === "loaded" && (
                    <div className="w-full flex flex-col md:flex-row md:items-start justify-center gap-6">
                        {/* Product Title (Mobile only) */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 drop-shadow-lg tracking-tight md:hidden">
                            {product.name}
                        </h1>

                        {/* Image Section */}
                        <div className="w-full md:w-[50%] flex justify-center">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg flex flex-col items-center w-full">
                                <ImageSlider images={product.Image} />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-[50%] flex flex-col gap-4 mt-6 md:mt-0 md:pl-4">
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col gap-4">
                                <h1 className="hidden md:block text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">{product.name}</h1>
                                <h2 className="text-xl font-semibold text-white/90">{product.category} category</h2>
                                <p className="text-white/80 text-justify">{product.description}</p>
                                <p className="text-lg text-green-400">Rs. {product.price?.toFixed(2)}</p>
                                <div className="text-sm text-white/70">
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
                    </div>
                )}

                {loadingStatus === "error" && (
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-lg">Error Occurred</div>
                    </div>
                )}
            </div>
        </div>
    );
}
