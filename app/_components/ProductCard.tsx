import Link from 'next/link'
import Image from 'next/image'
import { useCartContext } from '@context/CartProvider'


export default function ProductCard(product: any) {
    const { addToCart } = useCartContext();    

    return (
        <article className="lg:w-1/4 md:w-1/2 p-4 bg-white w-full">     
            <div className="block relative h-48 rounded overflow-hidden">
                <Image 
                    className="object-cover object-center w-full h-full block hover:object-scale-down" 
                    src={product.image} 
                    alt={product.name} 
                    width="100" 
                    height="100" 
                />
            </div>      
            <div className="mt-4 h-[200px] flex flex-col justify-start">
                <p className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{product.category.name}</p>
                <Link href={`/products/${product._id}`}>
                    <h2 className="text-gray-900 title-font text-lg font-medium capitalize line-clamp-3 text-ellipsis overflow-hidden">{product.name}</h2>
                </Link>
                <p className="mt-1">$ {Number(product.price).toFixed(2)}</p>
                <button onClick={() => addToCart(product)} className="justify-self-end mt-auto flex justify-center items-center gap-x-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-md w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    <span className="text-white">Add to cart</span>
                </button>
            </div>
        </article>
    )
}