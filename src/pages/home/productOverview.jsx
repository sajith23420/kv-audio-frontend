import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`
        ).then((res) => {
            setProduct(res.data);
            setLoadingStatus("loaded")
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
            setLoadingStatus("error")
        })

    }, [])


    return (
        <div className=" w-full h-full flex justify-center" >
            {
                loadingStatus == "loading" &&
                <div className="w-full h-full  flex justify-center items-center">
                    <div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full" >
                    </div>
                </div>
            }
            {
                loadingStatus == "loaded" &&
                <div className=" w-full h-full flex  items-center justify-center ">
                    <div className=" w-[49%] h-full" > 
                        <ImageSlider images={product.Image} />
                    </div>
                    <div className=" w-[49%] h-full flex flex-col items-center" > 
                        <h1 className="text-3xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-800">{product.category}</h2>
                        <p className=" text-gray-800 mt-4">{product.description}</p>
                        <p className="text-lg font-bold text-green-500 ">{product.price}</p>
                        <div className="mt-4 text-sm text-gray-600">{/* Additional info can go here */}
                            <span className="font-medium">Dimensions:</span> {product.dimensions}
                        </div>
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300" onClick={()=>{
                            addToCart(product.key, 1);
                            console.log(loadCart())
                        }}>Add to Cart</button>
                    </div>


                </div>
            }

            {
                loadingStatus == "error" &&
                <div className="w-full h-full  flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-accent">Error Occurred </h1>
                </div>
            }
        </div>
        
    )
}