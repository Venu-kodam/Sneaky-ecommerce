import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))  //we cant send array directly by formdata,so use stringify
      image1 && formData.append('image1',image1)
      image2 && formData.append('image2',image2)
      image3 && formData.append('image3',image3)
      image4 && formData.append('image4',image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2 font-medium'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1" className='cursor-pointer'>
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} className='w-20' alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2" className='cursor-pointer'>
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} className='w-20' alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3" className='cursor-pointer'>
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className='w-20' alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4" className='cursor-pointer'>
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className='w-20' alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>
      <div className='w-full sm:max-w-[500px]'>
        <p className='mb-2 font-medium'>Product name</p>
        <input onChange={e => setName(e.target.value)} value={name} type="text" className='w-full  px-3 py-2' placeholder='Type here' />
      </div>
      <div className='w-full sm:max-w-[500px]'>
        <p className='mb-2 font-medium'>Product description</p>
        <textarea onChange={e => setDescription(e.target.value)} value={description} type="text" className='w-full  px-3 py-2' placeholder='Write description here' />
      </div>
      <div className='flex flex-col sm:flex-row gap-3 w-full sm:gap-4 items-center'>
        <div >
          <p className='mb-2 font-medium'>Product Category</p>
          <select onChange={e => setCategory(e.target.value)} value={category} name="" id="" className='w-full px-3 py-2 sm:max-w-[500px]'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2 font-medium'>Sub Category</p>
          <select onChange={e => setSubCategory(e.target.value)} value={subCategory} name="" id="" className='w-full px-3 py-2  sm:max-w-[500px]'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2 font-medium'>Product Price</p>
          <input onChange={e => setPrice(e.target.value)} value={price} type="Number" placeholder='28' className='w-full px-3 py-2  sm:max-w-[500px]' />
        </div>
      </div>
      <div>
        <p className='mb-2 font-medium'>Product Sizes</p>
        <div className='flex items-center gap-3 '>
          <div onClick={()=>setSizes(prev=>prev.includes('S')?prev.filter(item=>item!=='S'):[...prev,'S'])} className='cursor-pointer'>
            <p className={`${sizes.includes('S')? "bg-black text-white":"bg-violet-100"} px-3 py-1 border border-gray-800 font-medium `}>S</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('M')?prev.filter(item=>item!=='M'):[...prev,'M'])} className='cursor-pointer'>
            <p className={`${sizes.includes('M')? "bg-black text-white":"bg-violet-100"} px-3 py-1 border border-gray-800  font-medium`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('L')?prev.filter(item=>item!=='L'):[...prev,'L'])} className='cursor-pointer'>
            <p className={`${sizes.includes('L')? "bg-black text-white":"bg-violet-100"} px-3 py-1 border border-gray-800  font-medium`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XL')?prev.filter(item=>item!=='XL'):[...prev,'XL'])} className='cursor-pointer'>
            <p className={`${sizes.includes('XL')? "bg-black text-white":"bg-violet-100"} px-3 py-1 border border-gray-800  font-medium`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XXL')?prev.filter(item=>item!=='XXL'):[...prev,'XXL'])} className='cursor-pointer'>
            <p className={`${sizes.includes('XXL')? "bg-black text-white":"bg-violet-100"} px-3 py-1 border border-gray-800  font-medium`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 items-center  mt-2'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>
      <button type='submit' className='w-28 py-2 px-6 mt-3 bg-black text-white rounded'>Add</button>
    </form >
  )
}

export default Add