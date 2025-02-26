import { useEffect, useState } from "react";
import CartedCart from "../helperComponents/CartedCart.jsx";

export default function Store() {
    const [product, setProducts] = useState([]);

    const cartBox = JSON.parse(localStorage.getItem('CartedProducts'));

    useEffect(() => {
        cartBox.forEach(obj => {
            const fetchProducts = async () => {
                const response = await fetch(`https://fakestoreapi.com/products/${obj.id}`);
                const data = await response.json();
                const cartedItem = {
                    ...data,
                    quantity: obj.count
                }
                setProducts((product) => [...product,cartedItem]);
            }
            fetchProducts();
        });
    }, []);

    return (
        <>
            <div>
                {
                    product.length != 0
                    ?
                    product.map(product => <CartedCart product={product} setProducts={setProducts}/>)
                    :
                    <h1>No Product Found</h1>
                }
            </div>
        </>
    )
}