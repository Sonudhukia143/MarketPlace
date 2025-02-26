import { useAuthContext } from "../context/AuthProvider.jsx";
import { useState,useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen);

    const [search, setSearch] = useState("");
    const {dispatch,state} = useAuthContext();
    const cartCount = state.cartedProducts;

    const searchProducts = async () => {
        if (!search.trim()) return;
        dispatch({type:"SEARCH",payload:{isSearching:true,products:null}})

        const response = await fetch(`https://fakestoreapi.com/products/category/${search}`);
        const data = await response.json();

        dispatch({type:'SEARCH', payload:{products:data,isSearching:false}});

    }



    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-evenly">

                        <h1 className="text-white text-xl font-bold">My Store</h1>

                        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                            <button
                                onClick={toggleNav}
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>

                                <svg className={isOpen ? "hidden size-6" : "block size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className={isOpen ? "block size-6" : "hidden size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                         
                        {/* Search Box */}
                        <div className="flex flex-1 items-center sm:justify-evenly">

                            <div className="flex w-1/2 hidden sm:flex items-center justify-center text-white">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-light-800 focus:outline-none"
                                >
                                </input>
                                <div className="w-1/2">
                                    <button onClick={searchProducts} className="cursor-pointer p-2 m-2">🔍</button>
                                </div>
                            </div>

                            {/* Cart Icon */}
                            <div className="relative">
                                <svg
                                    className="w-8 h-8 text-white cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                ></svg>
                            </div>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-gray-700 hover:text-white"}`
                                        }
                                    >
                                        Homepage
                                    </NavLink>
                                </div>
                            </div>

                        </div>

                        {/* Cart Icon */}
                        <NavLink to="/cart">

                        <div className="hidden sm:block">
                            <svg
                                className="w-8 h-8 text-white cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l1 5h13l1-5h2M16 21a2 2 0 100-4 2 2 0 000 4zM7 21a2 2 0 100-4 2 2 0 000 4z"
                                />
                            </svg>
                            {/* Cart Counter */}
                            { cartCount > 0 && (
                             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                 {cartCount}
                            </span>
                         ) 
                        }
                        </div>
                        </NavLink>


                    </div>

                    {/* Mobile Menu */}
                    <div className="sm:hidden w-1/1" id="mobile-menu">
                    <div className={isOpen ? "flex w-1/1 md:flex items-center justify-center text-white px-2 pt-4 pb-3" : "hidden space-y-1 px-2 pt-2 pb-3"}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full p-2 pl-6 border rounded-lg focus:ring-2 focus:ring-light-800 focus:outline-none"
                                >
                                </input>
                                <div className="w-1/8 ml-4">
                                    <button onClick={searchProducts} className="w-1/4 cursor-pointer p-2 m-">🔍</button>
                                </div>
                        </div>

                        <div className={isOpen ? "space-y-1 px-2 pt-4 pb-3" : "hidden space-y-1 px-2 pt-2 pb-3"}>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                }
                            >
                                Homepage
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}