import React from 'react'

const NewsLetter = () => {
    const HandleSubmit = (e)=>{
        e.preventDefault()
    } 
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now & Get 30% off</p>
        <p className='my-3 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facilis quam molestiae vero.</p>
        <form onSubmit={HandleSubmit} className='w-full sm:w-1/2 flex items-center mx-auto gap-4 my-6 border border-slate-500 pl-3 '>
            <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your Email' required/>
            <button className='bg-black text-xs  text-white px-8 py-3'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter