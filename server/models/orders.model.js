import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    items: [{
        product: Object,
        quantity: Number,
        price: Number
    }],
    total: Number,
    pm: {
        type: String,
        default: null,
    },
    sellerdone: {
        type: Boolean,
        default: false
    },
    buyerdone: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


const Orders = mongoose.model('Orders', orderSchema);

export default Orders;
