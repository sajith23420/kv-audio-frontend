import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date(Date.now() + 86400000)));
    const [total, setTotal] = useState(0);

    const daysBetween = Math.max(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
        1
    ); // Minimum 1 day

    function reloadCart() {
        setCart(loadCart());
        calculateTotal ();
       
    }
    function calculateTotal() {
        const cartInfo = loadCart();
        cartInfo.startingDate = startDate;
        cartInfo.endingDate = endDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        ).then((res) => {
            console.log(res.data);
            setTotal(res.data.total); 
        }).catch((err) => {
            console.error(err);
            toast.error("Error fetching quote. Please try again.");
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[startDate, endDate])

    function handleBookingCreation() {
        const currentCart = loadCart();
        currentCart.startingDate = startDate;
        currentCart.endingDate = endDate;
        currentCart.days = daysBetween;

        const token = localStorage.getItem("token");

        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, currentCart, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toast.success("Booking created successfully!");
                localStorage.removeItem("cart");
                setCart({ orderedItems: [] });
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error creating booking. Please try again.");
            });
    }

    return (
        <div className="w-full h-full flex flex-col items-center gap-6 p-6 bg-primary">
            <h1 className="text-2xl font-bold text-accent mb-4">Create Booking</h1>

            {/* Date Selection */}
            <div className="flex gap-6 items-end">
                <div className="flex flex-col">
                    <label className="text-accent font-medium mb-1">Start Date</label>
                    <input
                        type="date"
                        className="border border-accent rounded-lg px-3 py-2 bg-white text-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-accent font-medium mb-1">End Date</label>
                    <input
                        type="date"
                        className="border border-accent rounded-lg px-3 py-2 bg-white text-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="text-sm text-gray-600">
                    <span className="font-semibold">{daysBetween}</span> day(s)
                </div>
            </div>

            {/* Cart Items */}
            <div className="w-full flex flex-col items-center justify-center mt-4">
                {cart.orderedItems.map((item) => (
                    <BookingItem
                        key={item.key}
                        itemKey={item.key}
                        qty={item.qty}
                        refresh={reloadCart}
                    />
                ))}
            </div>

            <div className="w-full flex justify-center items-center mt-4">
                <div className="text-lg font-semibold text-accent">Total : Rs. {total.toFixed(2)}</div>


            </div>

            {/* Confirm Button */}
            <div className="w-full flex justify-center mt-[-20px]">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                    onClick={handleBookingCreation}
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
}
