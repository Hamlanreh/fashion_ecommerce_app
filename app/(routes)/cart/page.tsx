'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuthContext } from "@context/AuthProvider"
import { useCartContext } from "@context/CartProvider"

import Template from '@app/_components/Template'
import CartItem from '@app/_components/CartItem'
import CheckoutForm from '@app/_components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


export default function Cart() {
    const [clientSecret, setClientSecret] = useState('');
    const { isAuthenticated } = useAuthContext();
    const { items, quantity, total, clearCart } = useCartContext();

    const appearance: any = { theme: 'stripe', };
    const options: any = { clientSecret, appearance };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
        })
        .then((res) => res.json())
        .then(({ clientSecret }) => setClientSecret(clientSecret))
        .catch((err) => console.error(`Stripe payment connection failed!`));
    }, [items]);
    

    return (
        <Template>
            <section className="min-h-screen flex py-8 px-4 "> 
                <div className="w-full">
                    {items.length < 1 && (
                    <div className="flex min-h-60">
                        <div className="w-1/4"></div>
                        <div className="w-3/4 flex flex-col gap-y-2">
                            <h2>Your Fashnova Cart Is Empty</h2>
                            <p>Shop today&apos;s deals</p>
                            {isAuthenticated || (
                            <div className="flex gap-x-4 items-center mt-2">
                                <Link href="/login">
                                    <button className="bg-black text-white py-2 px-4 rounded-md">Log in your account</button>
                                </Link>
                                <Link href="/signup">
                                    <button className="bg-black text-white py-2 px-4 rounded-md">Sign up now</button>
                                </Link>
                            </div>)}
                        </div>
                    </div>)}

                    {items.length < 1 || (
                    <div className="py-8">
                        <header className="mb-10">
                            <h1 className="font-extrabold text-2xl">Your Cart [{quantity} Items]</h1>
                        </header>
                        <div className="flex flex-col divide-y dark:divide-gray-700">
                            {items.map((item: any) => (<CartItem key={item._id} {...item} />))}
                        </div>                            
                        <div className="pt-10 pb-6">
                            <button onClick={clearCart} className="flex justify-center items-center gap-x-4 mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-md w-full">
                                Clear cartitems
                            </button>
                        </div>
                    </div>
                    )}

                    <div className="flex gap-x-6 items-center py-6 border-t-2 border-white">
                        {items.length < 1 || (<p className="font-extrabold text-xl">Subtotal ({quantity} items): <span>${total.toFixed(2)}</span></p>)}                      
                    </div>

                    {isAuthenticated && clientSecret && 
                    (<Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>) 
                    }

                    <p className="py-4 text-sm">
                        The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item&apos;s most recent price. Learn more
                        <br /> Do you have a gift card or promotional code? We&apos;ll ask you to enter your claim code when it&apos;s time to pay.
                    </p>
                </div>
            </section>           
        </Template>
    )
}
