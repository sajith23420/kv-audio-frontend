import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductCard(props) {
    const item = props.item;
    const [showFullDesc, setShowFullDesc] = useState(false);
    const descLimit = 80;
    const desc = item.description || "";
    const isLong = desc.length > descLimit;
    const displayDesc = showFullDesc || !isLong ? desc : desc.slice(0, descLimit) + "...";

    return (
        <div className="w-full min-h-[400px] max-h-[500px] bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center transition-all duration-300">
            <img
                className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-white/20"
                src={item.Image[0]}
                alt={item.name}
            />
            <div className="w-full flex-1 flex flex-col justify-between">
                <h2 className="text-xl font-bold text-white mb-1 line-clamp-1">{item.name}</h2>
                <p className="text-sm text-white/80 mb-1">{item.category}</p>
                <p className="text-lg text-green-300 font-semibold mb-2">{item.price}</p>
                <div className="text-sm text-white/80 mb-2">
                    <p><span className="font-medium">Dimensions:</span> {item.dimensions}</p>
                    <p><span className="font-medium">Availability:</span> {item.availability ? 'In Stock' : 'Out of Stock'}</p>
                </div>
                <div className="text-xs text-white/70 mb-3 min-h-[32px] break-all">
                    {displayDesc}
                    {isLong && (
                        <button
                            className="ml-2 text-blue-300 underline hover:text-blue-400 focus:outline-none"
                            onClick={() => setShowFullDesc(v => !v)}
                        >
                            {showFullDesc ? "See less" : "See more"}
                        </button>
                    )}
                </div>
                <Link to={"/product/" + item.key} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 mt-auto text-center transition duration-300">
                    View Details
                </Link>
            </div>
        </div>
    );
}
