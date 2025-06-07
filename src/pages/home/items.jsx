import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../../components/productCard"
import toast from "react-hot-toast"
import Footer from "../../components/Footer"; // Import the Footer component

export default function Items() {
    const [state, setState] = useState("loading")//loading , success , error
    const [items, setItems] = useState([])

    useEffect(() => {
        if (state == "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`
            ).then((res) => {
                setItems(res.data)
                setState("success")
            }).catch((err) => {
                toast.error(err?.response?.data?.error || "An error occurred")
                setState("error")
            })
        }
    }, [])

    return (
        <>
            <section
                className="relative w-full min-h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/djman.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70 z-0" />

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 py-20 gap-12">
                    <div className="flex-1 flex flex-col justify-center text-white gap-10 min-w-[320px]">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 drop-shadow-lg tracking-tight text-center">Our Rental Products</h1>
                        {state === "loading" && (
                            <div className="w-full h-[400px] flex justify-center items-center">
                                <div className="w-[70px] h-[70px] border-b-4 border-b-white animate-spin rounded-full bg-white/10" />
                            </div>
                        )}
                        {state === "error" && (
                            <div className="w-full flex justify-center items-center">
                                <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-lg">Failed to load products.</div>
                            </div>
                        )}
                        {state === "success" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {items.map((item) => (
                                    <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-xl shadow-lg flex flex-col items-center">
                                        <ProductCard key={item.key} item={item} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
