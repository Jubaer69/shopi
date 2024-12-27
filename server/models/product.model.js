import mongoose from "mongoose";

const proSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    bikri: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Product = mongoose.model('Product', proSchema);

export default Product;