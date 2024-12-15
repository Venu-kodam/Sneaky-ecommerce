import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Orders = () => {
  const { products, currency,backendUrl,token } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  
  const loadOrderData = async()=>{
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      if(response.data.success){
        let allOrdersItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status 
            item['payment'] = order.payment 
            item['paymentMethod'] = order.paymentMethod 
            item['date'] = order.date 
            allOrdersItems.push(item)
          })
        })
        setOrderData(allOrdersItems.reverse())
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-10'>
      <p className='text-gray-600 sm:text-2xl mb-5'>MY <span className='text-gray-800 font-semibold'>ORDERS</span></p>
      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-3 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
            <div className='flex items-start gap-5 text-sm'>
              <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center mt-2 text-base text-gray-700 gap-3'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-2'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='border text-sm  px-4 py-2 font-medium'>Track order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders