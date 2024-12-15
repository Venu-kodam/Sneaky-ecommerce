import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestseller, setbestSeller] = useState([])
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller)
        setbestSeller(bestProduct.slice(0, 5))
    }, [products])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-6'>
                <div>
                    <p className='text-gray-600 text-center sm:text-2xl'>BEST <span className='text-gray-800 font-semibold'>SELLERS</span></p>
                    <p className='w-3/4 m-auto py-5 text-xs sm:text-sm md:text-base '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta iure architecto itaque nam, dignissimos unde.</p>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
                bestseller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image = {item.image} name={item.name} price={item.price}/>
                ))
             }
            </div>
        </div>
    )
}

export default BestSeller