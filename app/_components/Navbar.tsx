'use client'
import Link from 'next/link';
import { FormEvent, useState, useEffect } from 'react';
import { useAuthContext } from '@context/AuthProvider';
import { useCartContext } from '@context/CartProvider';
import { useProductContext } from '@context/ProductProvider';
import DropDown from './DropDown';


export default function Navbar() {
    const { getProducts } = useProductContext();
    const { user, isAuthenticated, logout } = useAuthContext();
    const { items, quantity, calculateTotals } = useCartContext();

    const [ toggleDropDown, setToggleDropDown ] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchText) return;
        getProducts({ name: searchText })
        setSearchText('');
    }

    useEffect(() => {
        calculateTotals();
    }, [items])


    return (        
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-x-4">
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                        </Link>
                        <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" autoComplete={"autocomplete"} value={searchText} onChange={e => setSearchText(e.target.value)} />
                        </form>
                    </div>

                    <div className="hidden sm:flex sm:items-center gap-x-6">
                        <Link href="/cart" className="relative flex items-center gap-x-2 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            <span className="absolute -top-4 -right-6 bg-black text-white text-sm font-bold px-2 py-1 rounded-full">{quantity}</span>
                        </Link>
                        <Link href="/orders" className="text-gray-800 text-sm font-semibold hover:text-purple-600">
                            Orders
                        </Link>                        
                        {isAuthenticated && <Link href={`/profile/${user._id}`} className="text-gray-800 text-sm font-semibold hover:text-purple-600">
                            Profile
                        </Link>}
                        {isAuthenticated ? 
                        (<button onClick={logout} className="text-gray-800 text-sm font-semibold hover:text-purple-600">Logout</button>) : 
                        (<Link href="/login" className="text-gray-800 text-sm font-semibold hover:text-purple-600">Sign in</Link>)}
                        
                        <Link href="/signup" className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">Sign up</Link>
                    </div>
                    
                    <div className="sm:hidden cursor-pointer flex gap-x-6 items-center">
                        <Link href="/cart" className="relative flex items-center gap-x-2 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            <span className="absolute -top-4 -right-6 bg-black text-white text-sm font-bold px-2 py-1 rounded-full">{quantity}</span>
                        </Link>
                        <div onClick={() => setToggleDropDown(!toggleDropDown)} className="cursor-pointer">
                            <svg height="24px" width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                        </div>
                    </div>
                </div>
                    
                {toggleDropDown && (<DropDown />)}
            </div>
        </nav>
    )
}




