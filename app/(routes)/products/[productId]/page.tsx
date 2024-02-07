'use client'
import Image from 'next/image';
import { useEffect } from "react";
import { useCartContext } from '@context/CartProvider'
import { useProductContext } from "@context/ProductProvider";
import Template from "@app/_components/Template";


export default function Product({ params }: { params: { productId: string }}) {
    const { addToCart } = useCartContext();    
    const { currentProduct, getProductById } = useProductContext();

    useEffect(() => {
        getProductById(params.productId);
    }, [params.productId])


    return (
        <Template>
            <section className="min-h-screen py-8 px-4">
                <article className="container mx-auto flex flex-col md:flex-row gap-x-4">
                    <div className="w-full md:w-2/4 mb-8 md:mb-0">
                        <Image 
                            className="w-full object-cover object-center rounded-md overflow-hidden" 
                            src={currentProduct.image} 
                            alt="product" 
                            width="200" 
                            height="200" 
                        /> 
                    </div>
                    <div className="w-full md:w-2/4">
                        {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-4 uppercase">{currentProduct.category.name}</h3> */}
                        <p className="block mx-auto font-bold capitalize text-justify mb-4">{currentProduct.name}</p>
                        <p className="font-bold mb-4">$ {currentProduct.price}</p>
                        <p className="mb-8 flex gap-x-2">{currentProduct.rating > 0 && (new Array(currentProduct.rating).fill(<span className="text-yellow-500">&#9733;</span>))}</p>
                        <button onClick={() => addToCart(currentProduct)} className="bg-black w-3/4 flex justify-center gap-x-4 py-2 px-4 rounded-sm font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            <span className="text-white">Add to cart</span>
                        </button>
                    </div>
                </article>
            </section>
        </Template>
    )
}
