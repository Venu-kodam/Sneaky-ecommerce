import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
        <p className='text-gray-600 sm:text-2xl mb-5 text-center border-t py-5'>CONTACT <span className='text-gray-800 font-semibold'>US</span></p>
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-20'>
          <img src={assets.contact_img} className='w-full md:max-w-[500px]' alt="" />
          <div className='flex flex-col gap-4'>
            <p className='font-semibold text-xl text-gray-800'>Our Store</p>
            <p>74275 Wills Station <br /> Suite 777, NewYork, USA</p>
            <p>Tel: (718)555-4920 <br />Email: admin@sneaky.com</p>
            <p className='text-xl font-semibold text-gray-800'>Careers at Sneaky</p>
            <p>Learn more about our teams and job openings</p>
            <button className='text-white bg-black px-3 py-2 max-w-[150px]'>Explore Jobs</button>
          </div>
        </div>
        <NewsLetter />
    </div>
  )
}

export default Contact