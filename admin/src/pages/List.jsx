import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [productslist, setProductlist] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProductlist(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div>
      <p className='mb-2 font-medium text-2xl'>Products List</p>
      <div className='flex flex-col gap-2'>
        {/* ---------Table title---------  */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 text-sm items-center py-1 px-2 '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* ----------product list--------  */}
        {
          productslist.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm font-medium' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>$ {item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='font-medium'>X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List