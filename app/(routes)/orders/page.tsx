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
            <section className="min-h-screen py-8 px-2 md:px-4">
                <div className="container mx-auto">                
                    <h1 className="font-bold text-2xl mb-10">Your Orders</h1>

                    <div className="w-full flex flex-col gap-y-4">
                        <div className="bg-gray-100 p-2 md:p-6 flex gap-x-2 justify-between">
                            <div className="w-1/4 md:w-2/5">
                                <h2 className="font-bold text-sm md:text-xl">Orders</h2>
                            </div>
                            <div className="w-1/4 md:w-2/5">
                                <h2 className="font-bold text-sm md:text-xl">Date</h2>
                            </div>
                            <div className="w-1/4 md:w-2/5">
                                <h2 className="font-bold text-sm md:text-xl">Customer</h2>
                            </div>
                            <div className="w-1/4 md:w-2/5">
                                <h2 className="font-bold text-sm md:text-xl">Status</h2>
                            </div>
                        </div>

                        {orders.length > 0 && orders.map((order: any) => (
                        <div key={order._id} className="bg-gray-100 p-2 md:p-6 flex gap-x-2 justify-between">
                            <div className="w-1/4 md:w-2/5 break-words">
                                <p className="text-md font-bold">Order</p>
                                <p className="text-sm md:text-md">Order ID: #ID{order._id}</p>
                            </div>
                            <div className="w-1/4 md:w-2/5 break-words">
                                <p className="text-sm md:text-md">{new Intl.DateTimeFormat('en-US').format(order.cratedAt)}</p>
                            </div>
                            <div className="w-1/4 md:w-2/5 break-words">
                                <p className="text-sm md:text-md">user1@gmail.com</p>
                            </div>
                            <div className="w-1/4 md:w-2/5 break-words">
                                <p className="text-sm md:text-md">{order.status}</p>
                            </div>
                        </div>))}
                    </div>
                </div>
            </section>
        </Template>
    )
}