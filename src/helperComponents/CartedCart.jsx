import { useState } from "react";

export default function CartedCart({ product, setProducts }) {
    const [info, setInfo] = useState([]);

    const removeFromCart = async () => {
        const data = JSON.parse(localStorage.getItem("CartedProducts")) || [];
        const laterData = data.filter((obj) => obj.id !== product.id);
        localStorage.setItem("CartedProducts", JSON.stringify(laterData));

        if (laterData.length === 0) {
            setInfo([]);
            setProducts([]);
            return;
        }

        // Fetch updated carted products
        const updatedProducts = await Promise.all(
            laterData.map(async (obj) => {
                const response = await fetch(`https://fakestoreapi.com/products/${obj.id}`);
                const fetchedData = await response.json();
                return { ...fetchedData, quantity: obj.count };
            })
        );

        setInfo(updatedProducts);
        setProducts(updatedProducts);
    };

    return (
        <div className="products">
            <div className="productBox" key={product.id}>
                <span className="productImage">
                    <img src={product.image} alt={product.title} />
                </span>
                <p>Available Products: {product.rating.count}</p>
                <p>${product.price}</p>
                <p>{product.title}</p>
                <p>Category: {product.category}</p>
                <span className="productRating">
                    {product.rating.rate >= 5 ? <p>⭐⭐⭐⭐⭐</p> : <p>⭐⭐⭐⭐</p>}
                </span>
                <p>Items Count: {product.quantity}</p>
                <button className="addToCart" onClick={removeFromCart}>Remove</button>
            </div>
        </div>
    );
}
