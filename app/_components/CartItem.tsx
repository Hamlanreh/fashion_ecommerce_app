import Image from 'next/image'
import { useCartContext } from '@context/CartProvider'


export default function CartItem({_id, name, image, price, quantity, category}: any) {
    const { increase, decrease, removeFromCart } = useCartContext();
    
    return (
        <article className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
                <Image 
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" 
                    src={image} 
                    alt={name}
                    width="140"
                    height="140"
                />
                <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold leadi sm:pr-8">{name}</h3>
                            <p className="text-sm dark:text-gray-400 capitalize">{category.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">${Number(price * quantity).toFixed(2)}</p>
                            <p className="text-sm line-through dark:text-gray-600">$0.00</p>
                        </div>
                    </div>
                    <div className="flex items-center border-gray-100 my-2">
                        <span onClick={() => decrease(_id)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                        <span className="h-8 w-8 border bg-white text-center text-xs outline-none flex items-center justify-center">{`${quantity}`}</span>
                        <span onClick={() => increase(_id)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                    </div>
                    <div className="flex text-sm divide-x">
                        <button onClick={() => removeFromCart(_id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                <rect width="32" height="200" x="168" y="216"></rect>
                                <rect width="32" height="200" x="240" y="216"></rect>
                                <rect width="32" height="200" x="312" y="216"></rect>
                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                            </svg>
                            <span>Remove</span>
                        </button>
                        <button type="button" className="flex items-center px-2 py-1 space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                            </svg>
                            <span>Add to favorites</span>
                        </button>
                    </div>
                </div>
            </div>
        </article> 
    )
}