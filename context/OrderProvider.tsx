'use client'
import { createContext, useContext, useState } from 'react'

interface IOrder {
    orders: any[];
    createOrder: (order: any) => void;
    getOrders: () => void;
}

const defaultState: IOrder = {
    orders: [],
    createOrder: () => {},
    getOrders: () => {},
}

const OrderContext = createContext<IOrder>(defaultState);


export default function OrderProvider({ children }: {children: React.ReactNode}) {
    const [state, setState] = useState({
        orders: [],
    })

    const createOrder = async (order: any) => {
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(order)
        })
    }

    const getOrders = async () => {
        const res = await fetch('/api/orders');
        const { data } = await res.json();
        setState({ ...state, orders: data })
    }


    return (
        <OrderContext.Provider value={{ ...state, createOrder, getOrders }}>
            {children}
        </OrderContext.Provider>
    )
}


export const useOrderContext = () => useContext(OrderContext);