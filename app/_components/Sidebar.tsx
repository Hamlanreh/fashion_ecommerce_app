'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FormEvent, useState, useEffect } from 'react';
import { useAuthContext } from '@context/AuthProvider'
import { useProductContext } from '@context/ProductProvider';


export default function Sidebar() {
    const [ searchText, setSearchText ] = useState('');
    const { isAuthenticated, logout } = useAuthContext();
    const { categories, getProducts, getCategories } = useProductContext();

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchText) return;
        getProducts({ name: searchText })
        setSearchText('');
    }

    useEffect(() => { 
        getCategories()
    }, []);


    return (
        <aside className="hidden md:block w-1/4 h-screen relative">
            <div className="m-4 sol-span-1 flex h-[500px] flex-col justify-between rounded-xl bg-white p-8">
                <Link href="/" className="flex items-center font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg hover:bg-green-100">
                    <Image
                        className="mr-2 h-8 w-8"
                        src="/images/icons/home_icon.svg" 
                        alt="home" 
                        width="64" 
                        height="64" 
                    />
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Novash</h2>
                </Link>

                <form onSubmit={handleSearch} className="relative mt-6 mb-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" autoComplete={"autocomplete"} value={searchText} onChange={e => setSearchText(e.target.value)} />
                </form>

                <section className="space-y-2">
                    <div>
                        <Link href="/" className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg bg-gray-100 hover:bg-green-100">
                            <Image 
                                className="mr-3 h-6 w-6"
                                src="/images/icons/product.svg" 
                                alt="cart" 
                                width="25" 
                                height="25"
                            />
                            New In
                        </Link>
                    </div>
                    {categories.length > 0 && categories.map((category: any) => (
                    <div key={category._id}>
                        <Link href={`/category/${category.name}`} className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg bg-gray-100 hover:bg-green-100">
                            <Image 
                                className="mr-3 h-6 w-6"
                                src={`/images/icons/${category?.name}.svg`} 
                                alt={category?.name} 
                                width="24" 
                                height="24" 
                            />
                            <span>{`${category?.name[0].toUpperCase()}${category?.name.slice(1)}`}</span>
                        </Link>
                    </div>
                    ))}
                </section>

                {isAuthenticated && (
                <button onClick={logout} className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg hover:bg-green-100 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="mr-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Logout
                </button>)}
            </div>
        </aside>
    )
}
