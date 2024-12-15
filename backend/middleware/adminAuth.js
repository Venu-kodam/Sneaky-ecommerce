import jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
    try {
        //once we login as a admin, a token will be generated,get that token from headers
        const { token } = req.headers  
        if (!token) {
            return res.json({ success: false, message:"Not authorized to login" })
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET) 
        if(token_decode !==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ success: false, message:"Not authorized to login" })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message:error.message })
    }
}

export default adminAuth