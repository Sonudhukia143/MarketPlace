import { useAuthContext } from "../context/AuthProvider";
import "../styles/ProductBox.css";

export default function ProductBox (product) {
    const {dispatch} = useAuthContext();

    const addToCart = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${product.product.id}`);
        const data = await response.json();
        dispatch({type:'ADDTOCART', payload:{cartedProducts:data}});
    }

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
        </>
    )
}