import { useState } from "react";
import "../styles/Cart.css";
import { useAuthContext } from "../context/AuthProvider";

export default function AddToCart({product,setCart}) {
    const [count,setCount] = useState(1);
    const {dispatch} = useAuthContext();

    const fetchData = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${product.id}`);
        const data = await response.json();

        dispatch({type:'ADDTOCART',payload:{cartedProducts:data,count:count}});
        setCart(false);
    }

    const increment = () => {
        if(count < product.rating.count){
            setCount(count + 1);
        }
    }

    const decrement = () => {
        if(count > 1){
            setCount(count - 1);
        }
    }

    return (
        <>
            <div className="cartBox productBox" key={product.id}>
                <span className="productImage">
                    <img src={`${product.image}`}></img>
                </span>
                <p>Availaible Products : {product.rating.count}</p>
                <p>${product.price}</p>
                <p>{product.title}</p>
                <p>Category : {product.category}</p>
                <span className="productRating">
                    {
                        product.rating.rate >= 5
                            ?
                            <p>⭐⭐⭐⭐⭐</p>
                            :
                            <p>⭐⭐⭐⭐</p>
                    }
                </span>
                <button onClick={increment} className="increment">+</button>
                {count}
                <button onClick={decrement} className="decrement">-</button>
                <button className="addToCart" onClick={fetchData}>Add To Cart</button>
            </div>
        </>
    )
}