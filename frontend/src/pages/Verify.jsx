import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Verify = () => {
    const { token, navigate, setCartItems,backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + "/api/order/verifyStripe", { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            }
            else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [token])
    return (
        <div>
            Verify
        </div>
    )
}

export default Verify