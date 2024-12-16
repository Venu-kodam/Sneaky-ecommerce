import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '$'
    const delivery_fee = 5 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showsearch, setShowsearch] = useState(false)
    const[products,setProducts] = useState([])
    const[cartitems,setCartItems] = useState({})
    const navigate = useNavigate()
    const [token,setToken] = useState('')
    const addToCart=async(itemId,size)=>{
        if(!size){
            toast.error("Please Select Product size")
            return
        }
        let cartData = structuredClone(cartitems)  //take a copy of cartItems
        
        if(cartData[itemId]){    //check if itemId is available
            if(cartData[itemId][size]){   //check size is available,if it is,increment size by 1
                cartData[itemId][size] +=1
            }
            else{
                cartData[itemId][size] = 1 //if size is not available then set to 1
            }
        }
        else{                       //if the itemId is not available
            cartData[itemId] = {}   //take empty object   
            cartData[itemId][size] = 1   // increment the size of the item by 1
        }

        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl + "/api/cart/add",{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        console.log(cartitems);
    },[cartitems])

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartitems) 
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl + "/api/cart/update",{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getCartAmount = ()=>{
        let totalAmount = 0
        for(const items in cartitems){
            let itemInfo = products.find(product=>product._id === items)
            for(const item in cartitems[items]){
                try {
                    if(cartitems[items][item]>0){
                        totalAmount+= itemInfo.price * cartitems[items][item]  //price * quantity
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount
    }

    const getProductsData = async()=>{
        try {
            const response = await axios.get(backendUrl + "/api/product/list")
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProductsData()
    },[])
    const getUserCart = async(token)=>{
        try {
            const response = await axios.post(backendUrl + "/api/cart/get",{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
            
        } catch (error) {
            console.log(error); 
        }
    }
    
    const getCartCount = ()=>{
        let totalCount = 0
        for(const items in cartitems){  //iterate through items
            for(const item in cartitems[items]){   //iterate throught size
                try {
                    if(cartitems[items][item]>0){
                        totalCount+= cartitems[items][item]  
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount
    }

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])
    const value={
        products,currency,delivery_fee,search,setSearch,showsearch,setShowsearch,
        cartitems,setCartItems,addToCart,getCartCount,updateQuantity,getCartAmount,
        backendUrl,navigate,token,setToken
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider