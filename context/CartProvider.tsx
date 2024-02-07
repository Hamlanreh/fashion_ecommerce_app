'use client'
import { createContext, useContext, useState } from 'react'

interface ICart {
    items: any[];
    quantity: number;
    total: number;
    addToCart: (value: any) => void;
    increase: (value: number) => void;
    decrease: (value: number) => void;
    removeFromCart: (value: number) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

const defaultState: ICart = {
    items: [],
    quantity: 0,
    total: 0,
    addToCart: () => {},
    increase: () => {},
    decrease: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    calculateTotals: () => {}
}

const CartContext = createContext<ICart>(defaultState);


export default function CartProvider({ children }: {children: React.ReactNode}) {
    const [cartState, setCartState] = useState({
        items: [],
        quantity: 0,
        total: 0,
    })


    const addToCart = (cartItem: any) => {
        const index = cartState.items.findIndex((item: any) => item._id === cartItem._id);
        
        if (index === -1) {
            const newItem = { ...cartItem, quantity: 1 };
            setCartState((state: any) => ({ ...state, items: [...state.items, newItem] }))
        } 
    };

    const removeFromCart = (itemId: number) => {
        const cartItems = cartState.items.filter((item: any) => item._id !== itemId);
        setCartState(state => ({...state, items: [...cartItems]}))
    }

    const increase = (itemId: number) => {
        const cartItems = cartState.items.map((item: any) => {
            if (item._id === itemId) item.quantity = item.quantity + 1;
            return item;
        });
        setCartState((state: any) => ({ ...state, items: [...cartItems] }));
    }
  
    const decrease = (itemId: number) => {
        let cartItems = cartState.items.map((item: any) => {
            if (item._id === itemId) item.quantity = item.quantity - 1;
            return item;
        });
        cartItems = cartItems.filter(item => item.quantity > 0);
        setCartState((state: any) => ({ ...state, items: [...cartItems] })); 
    }

    const clearCart = () => {
        setCartState(state => ({...state, items: []}))
    }

    const calculateTotals = () => {
        let quantity = 0;
        let total = 0;
        cartState.items.forEach((item: any) => {
            quantity = item.quantity + quantity;
            total = (item.quantity * item.price) + total;
        });
        setCartState(state => ({ ...state, quantity, total }))
    }


    return (
        <CartContext.Provider value={{ ...cartState, addToCart, increase, decrease, removeFromCart, clearCart, calculateTotals }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCartContext = () => useContext(CartContext);