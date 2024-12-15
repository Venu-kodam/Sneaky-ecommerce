import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
    return (
        <div className='w-[20%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to='/add' className="flex items-center gap-3 border border-slate-600 px-3 py-2 rounded-lg border-r-0">
                    <img src={assets.add_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block font-medium'>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="flex items-center gap-3 border border-slate-600 px-3 py-2 rounded-lg border-r-0">
                    <img src={assets.order_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block font-medium'>List Items</p>
                </NavLink>
                <NavLink to='/orders' className="flex items-center gap-3 border border-slate-600 px-3 py-2 rounded-lg border-r-0">
                    <img src={assets.order_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block font-medium'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar