import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from "../assets/frontend_assets/assets"
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const { setShowsearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }
    return (
        <div className='navbar flex items-center justify-between py-5'>
            <Link to="/" className='text-3xl sm:text-5xl logo font-semibold' >Sneaky</Link>
            <ul className='hidden sm:flex gap-4 text-sm font-medium text-slate-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-1/2 border-none h-[1.6px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-1/2 border-none h-[1.6px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collections" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-1/2 border-none h-[1.6px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-1/2 border-none h-[1.6px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-5'>
                <img onClick={() => setShowsearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    { 
                        token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-3 w-36 py-3 px-5 bg-slate-200 text-gray-500'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} className='w-5' alt="" />
                    <p className='absolute right-[-4px] bottom-[-4px] w-4 text-center leading-4 bg-black  text-white  rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setMenu(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* sidebar menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${menu ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-700'>
                    <div onClick={() => setMenu(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180 cursor-pointer' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setMenu(false)} to='/' className="py-2 pl-6">HOME</NavLink>
                    <NavLink onClick={() => setMenu(false)} to='/about' className="py-2 pl-6 border">ABOUT</NavLink>
                    <NavLink onClick={() => setMenu(false)} to='/collection' className="py-2 pl-6 border">COLLECTION</NavLink>
                    <NavLink onClick={() => setMenu(false)} to='/contact' className="py-2 pl-6">CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar