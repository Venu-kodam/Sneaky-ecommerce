import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'

//App config
const app  = express()
const port = process.env.PORT || 4000

//Middlewares
app.use(express.json())
app.use(cors())
connectDb()
connectCloudinary()

//api endpoints

app.use('/api/user',userRouter)   //Route for User
app.use('/api/product',productRoute)  //Route for product
app.use('/api/cart',cartRoute)  //Route for cartData
app.use('/api/order',orderRoute)
app.get('/',(req,res)=>{
    res.send('API working')
})


app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
})