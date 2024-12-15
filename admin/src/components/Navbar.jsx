import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-4 px-[4%]'>
        <h1 className='text-2xl sm:text-4xl font-semibold logo'>Sneaky admin</h1>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-8 py-2 sm:px-6 rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Navbar