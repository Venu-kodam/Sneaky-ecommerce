import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method, setMethod] = useState('cod')
  const { backendUrl, token, cartitems, setCartItems, products, getCartAmount, delivery_fee, navigate } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currecy: order.currecy,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const {data} = await axios.post(backendUrl+"/api/order/verifyRazorpay",response,{headers:{token}})
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartitems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/cod', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else {
            toast.error(response.data.message)
          }
          break
        case 'stripe':
          const response_stripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (response_stripe.data.success) {
            const { session_url } = response_stripe.data
            window.location.replace(session_url)
          }
          else {
            toast.error(response_stripe.data.message)
          }
          break
        case 'razorpay':
          const response_razorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (response_razorpay.data.success) {
            initPay(response_razorpay.data.order)
          }
          break
        default:
          break
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='my-10 flex flex-col sm:flex-row  justify-between gap-12 pt-5'>
      <div className='flex flex-col gap-4 w-full sm:w-[40%]'>
        <div>
          <p className='text-gray-600 sm:text-2xl mb-3'>DELIVERY <span className='text-gray-800 font-semibold'>INFORMATION</span></p>
        </div>
        {/* ------address details---------- */}
        <div className='flex gap-2'>
          <input onChange={onChangeHandler} name='firstname' value={formData.firstname} type="text" className='border border-gray-900 px-3 py-1.5 w-full rounded' placeholder='Firstname' required />
          <input onChange={onChangeHandler} name='lastname' value={formData.lastname} type="text" className='border border-gray-900 px-3 py-1.5 w-full rounded' placeholder='Lastname' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='Email address' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='Street' required />
        <div className='flex gap-2'>
          <input onChange={onChangeHandler} name='city' value={formData.city} type="text" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='City' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} type="text" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='State' required />
        </div>
        <div className='flex gap-2'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='Zipcode' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} type="text" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='Country' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} type="text" className='border border-gray-900 px-3 py-1.5  w-full rounded' placeholder='Phone' required />
      </div>

      <div className='w-full sm:w-[45%]'>
        <CartTotal />

        {/* --------payment methods -------*/}
        <p className='text-gray-600 sm:text-2xl my-6'>PAYMENT <span className='text-gray-800 font-semibold'>METHOD</span></p>
        <div className='flex gap-3 flex-col lg:flex-row w-full'>
          <div onClick={() => setMethod('stripe')} className='flex  items-center gap-2 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
          </div>
          <div onClick={() => setMethod('razorpay')} className='flex items-center gap-2 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
          </div>
          <div onClick={() => setMethod('cod')} className='flex items-center gap-2 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className='text-sm font-medium text-gray-600'>CASH ON DELIVERY</p>
          </div>
        </div>
        <div className="my-8 w-full text-end">
          <button type='submit' className="text-white bg-black text-sm px-8 py-2">PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder