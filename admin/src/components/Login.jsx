import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Login = ({setToken}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            console.log(response);
            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center '>
            <form className=' bg-white shadow-md rounded-lg px-8 py-6 '>
                <h1 className='text-2xl font-medium text-center mb-4'>Admin Panel</h1>
                <form onClick={handleSubmit}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' className='px-4 py-2 rounded border border-gray-700 w-full' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your Password' required className='px-4 py-2 rounded border border-gray-700 w-full' />
                    </div>
                    <button className='text-white bg-black px-4 py-2 rounded w-full' type='submit'>Login</button>
                </form>
            </form>
        </div>
    )
}

export default Login