import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Policies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-10 sm:gap-2 text-center py-16 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt=""  className='w-12 m-auto my-3'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-slate-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} alt=""  className='w-12 m-auto my-3'/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-slate-400'>We provide 7 days Return policy</p>
        </div>
        <div>
            <img src={assets.support_img} alt=""  className='w-12 m-auto my-3'/>
            <p className='font-semibold'>24/7 Customer Support</p>
            <p className='text-slate-400'>We provide 24/7 Customer support</p>
        </div>
    </div>
  )
}

export default Policies