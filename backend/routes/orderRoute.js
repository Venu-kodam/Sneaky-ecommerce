import express from "express";
import { placeOrderCod,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRoute = express.Router()
// admin features
orderRoute.post('/list',adminAuth, allOrders)
orderRoute.post('/status',adminAuth, updateStatus)

//payment features
orderRoute.post('/cod',authUser,placeOrderCod)
orderRoute.post('/stripe',authUser,placeOrderStripe)
orderRoute.post('/razorpay',authUser,placeOrderRazorpay)

//user feature
orderRoute.post('/userorders',authUser,userOrders)

//verify payment
orderRoute.post('/verifyStripe',authUser,verifyStripe)
orderRoute.post('/verifyRazorpay',authUser,verifyRazorpay)
export default orderRoute