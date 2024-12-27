import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.send({
                succss: false,
                message: 'token not found'
            })
        }
        else{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded){
                res.send({
                    success: false,
                    message: 'token invalid'
                })
            }
            else{
                // console.log(decoded)
                req.id = decoded.fuckingid;
                // console.log(req.id)
                next()
            }
        }
    } catch (error) {
        console.log(error)
    }
} 