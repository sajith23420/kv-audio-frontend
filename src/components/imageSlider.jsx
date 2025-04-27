import { useState } from "react";

export default function ImageSlider({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) {
        return <div className="text-gray-400">No image available</div>;
    }

    return (
        <div className="flex flex-col items-center ">
            {/* Main Image */}
            <div className="w-[300px] h-[300px] md:h-[500px] md:w-[500px] mb-4 border rounded overflow-hidden">
                <img
                    src={images[currentIndex]}
                    alt="Product"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-[60px] h-[60px] object-cover border-2 rounded cursor-pointer transition ${index === currentIndex ? 'border-blue-500' : 'border-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
