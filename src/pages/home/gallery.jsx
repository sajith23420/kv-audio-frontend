import { useState } from "react"

const initialImages = [
    {
        url: "/gallery1.jpg",
        desc: "This is a short description for event 1."
    },
    {
        url: "/gallery2.jpg",
        desc: "This is a very long description for event 2. It is intentionally made long so that it exceeds the limit and triggers the see more/see less button to appear on the card. This should be visible in the UI for testing purposes."
    },
    {
        url: "/gallery3.jpg",
        desc: "Short description for event 3."
    },
    {
        url: "/gallery4.jpg",
        desc: "Short description for event 4."
    },
    {
        url: "/gallery5.jpg",
        desc: "Short description for event 5."
    },
    {
        url: "/gallery6.jpg",
        desc: "Short description for event 6."
    }
]

export default function Gallery() {
    const [images, setImages] = useState(initialImages)
    const [uploading, setUploading] = useState([false, false, false, false, false, false])
    const [showFullDesc, setShowFullDesc] = useState([false, false, false, false, false, false])
    const isAdmin = localStorage.getItem("token") && localStorage.getItem("role") === "admin"
    const descLimit = 80

    function handleImageUpload(e, idx) {
        const file = e.target.files[0]
        if (!file) return
        setUploading(prev => prev.map((u, i) => i === idx ? true : u))
        setTimeout(() => {
            const url = URL.createObjectURL(file)
            setImages(prev => prev.map((img, i) => i === idx ? { ...img, url } : img))
            setUploading(prev => prev.map((u, i) => i === idx ? false : u))
        }, 1200)
    }

    function toggleDesc(idx) {
        setShowFullDesc(prev => prev.map((v, i) => i === idx ? !v : v))
    }

    return (
        <div className="relative min-h-screen bg-gray-400 pt-[110px] pb-10 px-4">
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 drop-shadow-lg tracking-tight">Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                    {images.map((img, idx) => {
                        const isLong = img.desc.length > descLimit
                        const displayDesc = showFullDesc[idx] || !isLong ? img.desc : img.desc.slice(0, descLimit) + "..."
                        return (
                            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center">
                                <img src={img.url} alt={`Event ${idx + 1}`} className="w-full h-56 object-cover rounded-lg mb-4 border-2 border-white/20" />
                                <div className="text-xs text-white/70 mb-3 min-h-[32px] w-full text-center break-all">
                                    {displayDesc}
                                    {isLong && (
                                        <button
                                            className="ml-2 text-blue-300 underline hover:text-blue-400 focus:outline-none"
                                            onClick={() => toggleDesc(idx)}
                                        >
                                            {showFullDesc[idx] ? "See less" : "See more"}
                                        </button>
                                    )}
                                </div>
                                {isAdmin && (
                                    <label className="w-full">
                                        <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, idx)} />
                                        <button className="w-full bg-white/20 text-white border border-white/30 rounded-lg py-2 hover:bg-white/30 transition flex items-center justify-center disabled:opacity-60" disabled={uploading[idx]}>
                                            {uploading[idx] ? "Uploading..." : "Upload Image"}
                                        </button>
                                    </label>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}