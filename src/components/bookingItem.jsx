import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../utils/cart";
import toast from "react-hot-toast";

export default function BookingItem({ itemKey, qty, refresh }) {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        if (status === "loading") {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
                .then((res) => {
                    setItem(res.data);
                    setStatus("success");
                })
                .catch(() => {
                    setStatus("error");
                    removeFromCart(itemKey);
                    refresh();
                });
        }
    }, [status]);

    if (status !== "success") return null;

    return (
        <div className="w-full max-w-2xl bg-transparent shadow-lg rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-4 items-center">
            {/* Product Image */}
            <div className="w-[150px]  md:w-[120px] md:mt-4 flex-shrink-0">
                <img
                    src={item?.Image[0]}
                    alt={item?.name}
                    className="w-full h-[120px] object-cover rounded-lg"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full gap-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-white">{item?.name}</h3>
                        <p className="text-sm text-white">{item?.category}</p>
                        <p className="text-sm text-white mt-1">
                            Rs. {item?.price.toFixed(2)} / unit
                        </p>
                    </div>
                    <button
                        className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition"
                        onClick={() => {
                            removeFromCart(itemKey);
                            window.location.reload();
                        }}
                    >
                        <FaTrash />
                    </button>
                </div>

                {/* Quantity & Total */}
                <div className="flex justify-between items-center mt-2">
                    {/* Quantity Controller */}
                    <div className="flex flex-row items-center">
                        <button
                            className="p-1 text-accent hover:text-blue-600"
                            onClick={() => {
                                addToCart(itemKey, 1);
                                toast.success("Item added");
                                refresh();
                            }}
                        >
                            <FaArrowUp />
                        </button>
                        <span className="text-sm text-white">{qty}</span>
                        <button
                            className="p-1 text-accent hover:text-blue-600"
                            onClick={() => {
                                if (qty === 1) {
                                    removeFromCart(itemKey);
                                } else {
                                    addToCart(itemKey, -1);
                                }
                                refresh();
                            }}
                        >
                            <FaArrowDown />
                        </button>
                    </div>

                    {/* Total */}
                    <div className="text-right font-bold text-white text-sm md:text-base">
                        Total: Rs. {(item?.price * qty).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
