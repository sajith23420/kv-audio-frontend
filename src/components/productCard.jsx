import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const item = props.item;

    return (
        <div className="w-[200px] h-[400px] rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 p-4 m-4 relative" >
            <img
                className="w-full h-48 object-cover rounded-lg"
                src={item.Image[0]}
                alt={item.name}
            />
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-lg text-green-600 font-semibold mt-2">{item.price}</p>

                <div className="mt-2 text-sm text-gray-700">
                    <p><span className="font-medium">Dimensions:</span> {item.dimensions}</p>
                    <p><span className="font-medium">Availability:</span> {item.availability ? 'In Stock' : 'Out of Stock'}</p>
                </div>

                <p className=" mt-3 text-sm text-gray-600 line-clamp-3">
                    {item.description}
                </p>
                <div className="  flex h-full p-4 border-t border-gray-200 justify-center">
                    <Link to ={"/product/" + item.key} className=" text-center h-[40px]mt-4 w-[90%] bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300  mx-auto bottom-3 absolute">
                        View Details
                    </Link>

                </div>
            </div>
        </div>
    );
}
