'use client'
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '@context/AuthProvider';
import { useProductContext } from '@context/ProductProvider';


export default function DropDown() {
    const { getProducts } = useProductContext();
    const { isAuthenticated, user, logout } = useAuthContext();
    const [ searchText, setSearchText ] = useState('');

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchText) return;
        getProducts({ name: searchText })
        setSearchText('');
    }


    return (
        <div className="block sm:hidden bg-white border-t-2 py-2">
            <div className="flex flex-col">
                <form onSubmit={handleSearch} className="relative flex items-center mb-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)}/>
                </form>

                <p className="mb-4"><span className="font-bold">Hi,</span>&nbsp; <span>{user.username ? `${user?.username[0].toUpperCase()}${user?.username.slice(1)}` : 'Guest'}</span></p>

                <Link href="/orders" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-4">Orders</Link>

                {isAuthenticated && <Link href={`/profile/${user._id}`} className="text-gray-800 text-sm font-semibold hover:text-purple-600">
                    Profile
                </Link>}

                {isAuthenticated && (
                    <button onClick={logout} className="flex items-center mt-4 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
                        <span className="ml-4">Logout</span>
                    </button>
                )}

                <div className="flex justify-between items-center border-t-2 pt-2">
                    <Link href="/login" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Sign in</Link>
                    <Link href="/signup" className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">Sign up</Link>
                </div>
            </div>
        </div>
    )
}
