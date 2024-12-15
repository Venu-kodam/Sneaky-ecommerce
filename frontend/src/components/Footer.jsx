import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 my-10 mt-40 text-start'>
        <div>
          <h1 className='text-2xl font-medium mb-5'>SNEAKY</h1>
          <p className='w-full md:2/3 text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis atque, ratione, fuga iure porro eveniet voluptatibus a, laudantium earum modi cupiditate rerum aut ullam voluptatem iste nobis quidem dolores commodi.</p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-500'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div >
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-500'>
            <li>9876543210</li>
            <li>contact@sneaky.in</li>
          </ul>
        </div>
      </div>
      <div>
        <p className='text-center py-4'>Copyright &copy; 2024 All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer