import { useState } from "react";
import "../styles/ProductBox.css";
import AddToCart from "./AddToCart.jsx";

export default function ProductBox (product) {
    const [cart,setCart] = useState(false);

    const addToCart = (cart) => setCart(true);

    return (
        <>
        <div className="productBox" key={product.product.id}>
            <span className="productImage">
                <img src={`${product.product.image}`}></img>
            </span>
            <p>Availaible Products : {product.product.rating.count}</p>
            <p>${product.product.price}</p>
            <p>{product.product.title}</p>
            <p>Category : {product.product.category}</p>
            <span className="productRating">
                {
                product.product.rating.rate >= 5
                ?
                <p>⭐⭐⭐⭐⭐</p>
                :
                <p>⭐⭐⭐⭐</p>
                }
            </span>
            <button className="addToCart" onClick={addToCart}>Add To Cart</button>
        </div>
        {
            cart === false
            ?
            ""
            :
            <AddToCart product={product.product} setCart={setCart}  />
        }
        </>
    )
}