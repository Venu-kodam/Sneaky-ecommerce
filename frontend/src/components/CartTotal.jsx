import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <p className='text-gray-600 sm:text-2xl mb-5'>CART <span className='text-gray-800 font-semibold'>TOTAL</span></p>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p><b>{currency}</b> {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping fee</p>
          <p><b>{currency}</b> {delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <p><b>{currency}</b> {getCartAmount()===0 ? 0:getCartAmount()+ delivery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal