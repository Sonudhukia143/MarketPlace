import "../styles/Homepage.css";
import ProductBox from "../helperComponents/ProductBox.jsx";
import { useEffect, useState } from "react";
import Loader from "../helperComponents/Loader.jsx";
import { useAuthContext } from "../context/AuthProvider.jsx";

export default function Homepage() {
    const [initialProducts, setInitialProducts] = useState(null);
    const [searchedProducts, setSearchedProducts] = useState(null);
    const { state } = useAuthContext();
    const searching = state.isSearching;

    if (state.products === null) {
        useEffect(() => {
            setSearchedProducts(state.products);
        }, [state.products]);
    } else {
        useEffect(() => {
            setSearchedProducts(state.products);
        }, [state.products]);
    }

    useEffect(() => {
        const fetchProducts = async function () {
            const response = await fetch('https://fakestoreapi.com/products?limit=5');
            const data = await response.json();
            setInitialProducts(data);
        }
        fetchProducts();
    }, [])

    return (
        <>
            {searching && <Loader />}
            {
                searchedProducts?.length > 0 && searchedProducts != null
                    ?
                    <div key={"searchedProducts"} className="products">
                        {
                            searchedProducts == null
                                ?
                                ""
                                :
                                searchedProducts.map(searchedProducts => <ProductBox product={searchedProducts} />)
                        }
                    </div>
                    :
                    <div>
                        {
                            searchedProducts == null
                                ?
                            <h1 className="underNav">🔍Search Your Choice</h1>
                            :
                            <h1 className="underNav">😒No Products Found</h1>
                        }
                    </div>
            }
            <div className="main">
                <span className="leftmain">
                </span>
                <span className="rightmain">
                </span>
                <span className="textmain">
                    <h1>Welcome to My Store</h1>
                    <h1>Your Shopping</h1>
                    <h1>Destination</h1>
                </span>
            </div>
            <div className="main2">
                <h1>Discover Your Next Favorite Item</h1>
                <p>Browse our exclusive collection and find the perfect product tailored just for you.</p>
                <button>Shop</button>
                <button>Learn More</button>
            </div>
            <div key={"loadedProducts"} className="products">
                {
                    initialProducts == null
                        ?
                        <Loader />
                        :
                        initialProducts.map(product => <ProductBox product={product} />)
                }
            </div>
        </>
    )
}