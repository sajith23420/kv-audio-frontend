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
        calculateTotal();

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

    useEffect(() => {
        calculateTotal();
    }, [startDate, endDate])

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
        <div className="relative min-h-screen bg-cover bg-center pt-[110px] pb-10 px-4" style={{ backgroundImage: "url('/audio1.jpg')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 drop-shadow-lg tracking-tight">Create Booking</h1>

                {/* Date Selection */}
                <div className="flex flex-col md:flex-row gap-6 items-end justify-center mb-8">
                    <div className="flex flex-col">
                        <label className="font-medium mb-1 text-white">Start Date</label>
                        <input
                            type="date"
                            className="border border-accent rounded-lg px-3 py-2 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium mb-1 text-white">End Date</label>
                        <input
                            type="date"
                            className="border border-accent rounded-lg px-3 py-2 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="text-sm text-white/80">
                        <span className="font-semibold text-white">{daysBetween}</span> day(s)
                    </div>
                </div>

                {/* Cart Items */}
                <div className="w-full flex flex-col items-center justify-center mt-4">
                    {cart.orderedItems.length === 0 ? (
                        <div className="bg-transparent backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-lg">No items in cart.</div>
                    ) : (
                        cart.orderedItems.map((item) => (
                            <div className="w-full mb-4 bg-transparent backdrop-blur-md text-white p-4 rounded-xl shadow-lg flex flex-col items-center" key={item.key}>
                                <BookingItem
                                    itemKey={item.key}
                                    qty={item.qty}
                                    refresh={reloadCart}
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row justify-center items-center mt-4 gap-4">
                    <div className="text-lg font-semibold text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg">Total : Rs. {total.toFixed(2)}</div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg transition duration-300 mt-4 md:mt-0"
                        onClick={handleBookingCreation}
                        disabled={cart.orderedItems.length === 0}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
