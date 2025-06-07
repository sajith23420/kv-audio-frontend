import { useState } from "react"

const initialImages = [
    {
        url: "/gallery1.jpg",
        desc: "People dancing in a club with green and purple lights."
    },
    {
        url: "/gallery2.jpg",
        desc: "TPeople on a rooftop with red smoke."
    },
    {
        url: "/gallery3.jpg",
        desc: "DJ on a rooftop."
    },
    {
        url: "/gallery4.jpg",
        desc: "Two singers on stage."
    },
    {
        url: "/gallery5.jpg",
        desc: "Short description for event 5."
    },
    {
        url: "/gallery6.png",
        desc: "Short description for event 6."
    },
]

export default function Gallery() {
    const [images, setImages] = useState(initialImages)
    const [uploading, setUploading] = useState(Array(initialImages.length).fill(false))
    const [showFullDesc, setShowFullDesc] = useState(Array(initialImages.length).fill(false))
    const [selectedImage, setSelectedImage] = useState(null); // New state for popup
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

    function openImagePopup(imageUrl) {
        setSelectedImage(imageUrl);
    }

    function closeImagePopup() {
        setSelectedImage(null);
    }

    return (
        <section
            className="relative w-full min-h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/djman.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 py-20 gap-12">
                <div className="flex-1 flex flex-col justify-center text-white gap-10 min-w-[320px] ">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 drop-shadow-lg tracking-tight text-center">Gallery</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                        {images.map((img, idx) => {
                            const isLong = img.desc.length > descLimit
                            const displayDesc = showFullDesc[idx] || !isLong ? img.desc : img.desc.slice(0, descLimit) + "..."
                            return (
                                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center">
                                    <img
                                        src={img.url}
                                        alt={`Event ${idx + 1}`}
                                        className="w-full h-56 object-cover rounded-lg mb-4 border-2 border-white/20 cursor-pointer"
                                        onClick={() => openImagePopup(img.url)}
                                    />
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

            {/* Full-screen Image Popup */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeImagePopup}
                >
                    <div className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 max-w-3xl w-full flex flex-col items-center justify-center transform scale-95 animate-scale-in" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Full screen" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
                        <button
                            className="absolute top-4 right-4 text-white text-4xl font-bold bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition"
                            onClick={closeImagePopup}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
