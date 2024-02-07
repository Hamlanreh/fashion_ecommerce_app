'use client'
import { useEffect } from "react";
import { useOrderContext } from '@context/OrderProvider';
import Template from "@app/_components/Template";

export default function Orders() {
    const { orders, getOrders } = useOrderContext();

    useEffect(() => {
        getOrders();
    }, [orders])


    return (
        <Template>
            <section className="min-h-screen py-8 px-4">
                <div className="container mx-auto">                
                    <h1 className="font-bold text-2xl mb-10">Your Orders</h1>

                    <ul className="w-full flex flex-col gap-y-4">
                        <li className="bg-gray-100 p-6 flex justify-between">
                            <div className="w-2/5">
                                <h2 className="font-bold text-xl">Orders</h2>
                            </div>
                            <div className="w-1/5">
                                <h2 className="font-bold text-xl">Date</h2>
                            </div>
                            <div className="w-1/5">
                                <h2 className="font-bold text-xl">Customer</h2>
                            </div>
                            <div className="w-1/5">
                                <h2 className="font-bold text-xl">Status</h2>
                            </div>
                        </li>

                        {orders.length > 0 && orders.map((order: any) => (
                        <li key={order._id} className="bg-gray-100 p-6 flex justify-between">
                            <div className="w-2/5">
                                <path className="text-md font-bold">Order</path>
                                <p className="text-sm">Order ID: #ID{order._id}</p>
                            </div>
                            <div className="w-1/5">
                                <p>{order.date}</p>
                            </div>
                            <div className="w-1/5">
                                <p>user1@gmail.com</p>
                            </div>
                            <div className="w-1/5">
                                <p>{order.status}</p>
                            </div>
                        </li>))}
                    </ul>
                </div>
            </section>
        </Template>
    )
}