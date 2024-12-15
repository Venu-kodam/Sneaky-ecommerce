import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141] '>
                    <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    <h1 className='text-2xl sm:py-3 lg:text-5xl leading-relaxed latest-arrivals'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium text-sm md:text-base'>SHOP NOW</p>
                    </div>
                </div>
            </div>
                <img src={assets.hero_img} alt="" className='w-full sm:w-1/2 sm:h-[500px]'/>
        </div>
    )
}

export default Hero