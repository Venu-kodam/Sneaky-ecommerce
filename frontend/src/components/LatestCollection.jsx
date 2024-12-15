import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext)
    console.log(products);
    const [latestProducts, setlatestProducts] = useState([])

    useEffect(() => {
        setlatestProducts(products.slice(0, 10))
    }, [products])
    return (
        <div className='py-10'>
            <div>
                <p className='text-gray-600 text-center sm:text-2xl'>LATEST <span className='text-gray-800 font-semibold'>COLLECTIONS</span></p>
                <p className='w-3/4 m-auto py-5 text-xs sm:text-sm md:text-base '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta iure architecto itaque nam, dignissimos unde.</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
             {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image = {item.image} name={item.name} price={item.price}/>
                ))
             }   
            </div>
        </div>
    )
}

export default LatestCollection