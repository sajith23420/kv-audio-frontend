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
        <div className="flex gap-5 items-center bg-secondary rounded-xl p-4 shadow-md mb-4 w-full max-w-2xl relative">
            <div className="absolute  right-[-45px] cursor-pointer hover:text-white hover:bg-red-500  text-red-400 p-[10px] rounded-full">
                <FaTrash
                    onClick={() => {
                        removeFromCart(itemKey);
                        window.location.reload();
                    }}
                />
            </div>
            {/* Image */}
            <img
                src={item?.Image[0]}
                alt={item?.name}
                className="w-20 h-20 object-cover rounded-xl"
            />

            {/* Details */}
            <div className="flex flex-row items-center justify-between w-full">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-accent w-40 truncate">
                    {item?.name}
                </h3>

                {/* Unit Price */}
                <div className="text-sm text-gray-500 w-[80px] text-center">
                    Rs. {item?.price.toFixed(2)} /unit
                </div>

                {/* Quantity Controls */}
                <div className="relative w-[40px] text-center flex items-center justify-center text-sm text-gray-700">
                    <button
                        className="absolute top-[-20px] hover:text-accent "
                        onClick={() => {
                            addToCart(itemKey, 1);
                            toast.success("Item added to cart");
                            refresh();


                        }}>

                        <FaArrowUp />
                    </button>
                    {qty}
                    <button
                        className="absolute bottom-[-20px] hover:text-accent"
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

                {/* Total Price */}
                <div className="font-bold text-accent w-[100px] text-right">
                    Rs. {(item?.price * qty).toFixed(2)}
                </div>
            </div>
        </div>
    );
}
