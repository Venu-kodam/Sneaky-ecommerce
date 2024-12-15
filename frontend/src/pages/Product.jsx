import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products,currency,addToCart } = useContext(ShopContext)
  const [productsData, setProductsData] = useState("")
  const [image, setImage] = useState('')

  const[size,setSize] = useState('')
  const fetchProduct = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductsData(item)
        setImage(item.image[0])
        console.log("Product Data",item);
        return null
      }
    })
  }
  useEffect(() => {
    fetchProduct()
  }, [productId, products])
  return productsData ? (
    <div className='pt-10 border-t-2 transition-opacity ease-in-out duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:gap-12 sm:flex-row'>

        {/* --------- productImages -------- */}
        <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto  justify-between  sm:w-[18%] w-full'>
            {
              productsData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>
        {/* -------- productInfo --------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-3'>{productsData.name}</h1>
          <div className='flex items-center gap-1 mt-3'>
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_dull_icon} alt="" className='w-3.5' />
            <p className='pl-3'>(326)</p>
          </div>
          <p className='text-3xl font-medium my-4'>{currency} {productsData.price}</p>
          <p className='text-gray-500 md:w-4/5'>{productsData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productsData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} key={index} className={`border px-4 py-2 bg-gray-300 ${item===size ? 'border-purple-600 border-2' : ''}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productsData._id,size)} className='bg-black text-white px-8 py-2 text-sm active:bg-gray-600'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-gray-600 mt-5 text-sm flex flex-col gap-2'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/*  ---------Description and review section ------- */}
      <div className='my-20 '>
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (326)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-3 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products. Interact with  customers and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience,accessibility and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions,images,prices and any available variations(e.g. sizes,colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      {/* --------display related products------ */}
      <RelatedProducts category={productsData.category} subCategory={productsData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product