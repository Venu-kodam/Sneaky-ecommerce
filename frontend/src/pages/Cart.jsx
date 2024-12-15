import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartitems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) { //if quantity >0
            tempData.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item],
            });
          }
        }
      }
      setCartData(tempData)
    }

  }, [cartitems, products]);
  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-3">
        {cartData.length > 0 ?
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(product => product._id === item._id)
              return (
                <div key={index} className="py-4 border-t border-b text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                  <div className="flex items-start gap-4">
                    <img src={productData.image[0]} alt="" className="w-16 sm:w-20" />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="font-semibold">{currency}{productData.price}</p>
                        <p className="px-2 text-sm sm:text-base sm:px-3 sm:py-1 border bg-slate-100">{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onClick={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="Number" min={1} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className="w-4 cursor-pointer mr-4 " alt="" />
                </div>
              )
            })}
          </div>
          : <div className="text-center sm:text-3xl my-14">Your Cart is Empty</div>
        }
      </div>
      {cartData.length > 0 &&
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="my-8 w-full text-end">
              <Link to='/placeorder' className="text-white bg-black text-sm px-6 py-2">PROCEED TO CHECKOUT</Link>
            </div>
          </div>
        </div>
      }
    </div>
  )
};

export default Cart;
