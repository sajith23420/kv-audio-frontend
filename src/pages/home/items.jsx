import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../../components/productCard"
import toast from "react-hot-toast"

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
        <div className="relative min-h-screen bg-gray-400 pt-[110px] pb-10 px-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 drop-shadow-lg tracking-tight">Our Rental Products</h1>
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
    )
}
