import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <p className='text-gray-600 sm:text-2xl mb-5'>ABOUT <span className='text-gray-800 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src={assets.about_img} className='w-full md:max-w-[400px]' alt="" />
        <div className='flex flex-col justify-center gap-5 md:w-1/2 text-gray-500'>
          <p>Sneaky was born out of passion for innovation and a desire to revolution the way people shop online. Our journey began with a simple idea, to provide a platform where customers can easily discover,explore and purchase  a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection souced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice,convenience and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <p className='py-5 text-gray-600 sm:text-xl mb-5'>WHY <span className='text-gray-800 font-semibold'>CHOOSE US</span></p>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10  md:px-14 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent Quality standards.</p>
        </div>
        <div className='border px-10 md:px-14 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-500'>With our user-friendly interface and hassle-free ordering process,shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-14 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-500'>Our team of dedicated professionals is here to assist you the way,ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default About