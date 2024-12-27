import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log('database connected successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDb