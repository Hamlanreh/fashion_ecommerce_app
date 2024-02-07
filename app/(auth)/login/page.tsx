'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { useAuthContext }from '@context/AuthProvider';


export default function Login() {
    const router = useRouter();
    const { isAuthenticated, login, isLoggedIn } = useAuthContext();
    const [ userData, setUserData ] = useState({
        email: '', 
        password: ''
    });

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        login(userData);
        setUserData({email: '', password: ''});
    }

    useEffect(() => {
        if(isLoggedIn() === true) router.push('/');
    }, [isAuthenticated])


    return (
        <main className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <Link href="/"><h1 className="font-bold text-center text-2xl mb-5">Novash App</h1></Link>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form onSubmit={handleLogin} className="px-5 py-7">
                        <label htmlFor="email" className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input id="email" type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="user@mail.com" required={true} value={userData.email} onChange={e => setUserData(state => ({...state, email: e.target.value}))}/>
                        <label htmlFor="password" className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input id="password" type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" placeholder="******************" required={true} value={userData.password} onChange={e => setUserData(state => ({...state, password: e.target.value}))} />
                        <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="inline-block mr-2">Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <p className="text-center text-gray-600 text-sm mt-6">
                            Don&apos;t have an account? <Link className="font-bold text-blue-500 hover:text-blue-800" href="/signup">Sign up</Link>
                        </p>
                    </form>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    <span className="inline-block ml-1">Forgot Password</span>
                                </button>
                            </div>
                            <div className="text-center sm:text-right  whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="inline-block ml-1">Help</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <Link href="/" className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="inline-block ml-1">Go back to home page</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
