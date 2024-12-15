import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up")
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(currentState);
    
    try {
      if (currentState === 'Sign up') {
        //call signup api
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        //call login api
        const response = await axios.post(backendUrl + "/api/user/login", { email, password })
        console.log(response);
        
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <p className='text-3xl my-3'>{currentState}</p>
      <div className='flex flex-col gap-4 w-full'>
        {currentState === 'Login' ? null : <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Name' className='px-6 py-2 border border-gray-700 rounded' required />}
        <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='px-6 py-2 border border-gray-700 rounded' required />
        <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='px-6 py-2 border border-gray-700 rounded' required />
      </div>
      <div className='w-full text-sm font-medium'>
        {
          currentState === 'Login' ?
            <div className='w-full flex justify-between'>
              <p className='cursor-pointer '>Forgot your password?</p>
              <p onClick={() => setCurrentState('Signup')} className='cursor-pointer'>Create Account</p>
            </div>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-end'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white py-2 px-8 text-md my-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login