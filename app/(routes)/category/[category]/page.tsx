'use client'
import { useEffect, useState } from 'react';
import Template from '@app/_components/Template';
import ProductCard from '@app/_components/ProductCard';
import { useProductContext } from '@context/ProductProvider';


export default function Category({ params } : { params: { category: string }}) {
  const { products, getProducts } = useProductContext();
  const [ page, setPage ] = useState(1);


  useEffect(() => {
    getProducts({ page, category: params.category });
  }, [page])


  useEffect(() => {
    if (products.length < 1) { setPage(1) }
  }, [products])
  

  return (
    <Template>      
        <section className="min-h-screen py-8 px-4">
            <h1 className="text-grey-600 text-2xl font-bold capitalize">{params.category} products</h1>
            <div className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-wrap -m-4">         
                    {products.length > 0 && products.map((product:any) => (<ProductCard key={product._id} {...product} />))}    
                  </div>
                </div>
                <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
                    <div className="flex gap-x-6 justify-center items-center w-full">
                      <button onClick={() => setPage(page === 1 ? 1 : page - 1)} title="previous" type="button" className="inline-flex items-center justify-center w-10 h-10 py-0 border rounded-md shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="block text-lg font-bold">Page {page}</span>
                      <button onClick={() => setPage(page + 1)} title="next" type="button" className="inline-flex items-center justify-center w-10 h-10 py-0 border rounded-md shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                </div>
            </div>       
        </section> 
    </Template>    
  )
}