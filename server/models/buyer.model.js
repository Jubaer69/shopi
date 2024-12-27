import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

}, {timestamps: true})

const Buyer = mongoose.model('Seller', buyerSchema)

export default Buyer;