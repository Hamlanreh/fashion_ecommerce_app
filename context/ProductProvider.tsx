'use client'
import { createContext, useContext, useState } from 'react'

interface IProductContext {
    currentProduct: any;
    products: any;
    categories: any;
    getProducts: (param?: any) => void;
    getCategories: () => void;
    getProductById: (id: string) => any,
}

const defaultState: IProductContext = {
    currentProduct: {},
    products: [],
    categories: [],
    getProducts: () => {},
    getCategories: () => {},
    getProductById: () => {},
}

const ProductContext = createContext<IProductContext>(defaultState);


export default function ProductProvider({ children }: {children: React.ReactNode}) {
    const [state, setState] = useState({
        currentProduct: {},
        products: [],
        categories: [],
    })

    // Gets products using product name or using product category 
    const getProducts = async (paramObj: any = {}) => {
        let productUrl = `/api/products?page=${paramObj.page}`;
        
        if (Object.keys(paramObj).length > 0) {
            const searchParams = ['name', 'category'];
            searchParams.forEach(param => {
                if (paramObj[param]) productUrl += `&${param}=${paramObj[param]}`.toLowerCase();
            })
        }
        const res = await fetch(productUrl);
        const { data } = await res.json();
        setState(state => ({ ...state, products: data }));        
    }

    const getProductById = async (productId: string) => {
        const res = await fetch(`/api/products/${productId}`);
        const { data } = await res.json();
        setState(state => ({ ...state, currentProduct: data }));        
    }

    const getCategories = async () => {
        const res = await fetch('/api/categories');
        const { data } = await res.json();
        setState(state => ({ ...state, categories: data }));        
    }


    return (
        <ProductContext.Provider value={{ ...state, getProductById, getProducts, getCategories }}>
            {children}
        </ProductContext.Provider>
    )
}


export const useProductContext = () => useContext(ProductContext);