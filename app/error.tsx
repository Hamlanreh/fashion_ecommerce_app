'use client';
import Link from "next/link";
import Layout from '@app/_components/Template';

type ErrorProps = {
    error: Error,
    reset: () => void
};

export default function Error ({error, reset }: ErrorProps) {
    return (
        <Layout>
            <div className="grid h-screen px-4 place-content-center">
                <div className="text-center">
                    <h1 className="font-black text-9xl">401</h1>

                    <p className="text-2xl font-bold tracking-tight text-white sm:text-4xl">Something went wrong!</p>

                    <p className="mt-4 text-gray-800">{error.message || "You must be logged in to access the page"}</p>

                    <div className="w-60 mx-auto flex justify-between">
                        <button onClick={() => reset()} className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring">Try Again</button>    
                        <Link href="/" className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring">Go Home</Link>    
                    </div>    
                </div>
            </div>
        </Layout>
    )
}