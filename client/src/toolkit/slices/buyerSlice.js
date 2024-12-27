import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBuyer: null,
    allProducts: [],
    orders: [],
    cart: [],
    isOpen: false
}

export const BuyerSlice = createSlice({
    name: 'BuyerSlice',
    initialState,
    reducers: {
        setBuyer: (state, action) => {
             state.isBuyer = action.payload;
        },

        setAllProducts: (state, action) => {
             state.allProducts = action.payload;
        },
        setOrders: (state, action) => {
             state.orders = action.payload;
        },
        setCart: (state, action) => {
            const findelem = state.cart.find(v => v.product._id === action.payload.product._id);

            if(findelem){
                state.cart = state.cart.map(v => v.product._id === action.payload.product._id ? {...v, quantity: action.payload.quantity} : v)
            }   
            else{
                state.cart.push(action.payload)
            }
        },
        removeCart: (state, action) => {
            state.cart = action.payload;
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        }
    }
})

export const {setOrders, setAllProducts, setBuyer, setCart, setIsOpen,removeCart} = BuyerSlice.actions;
export default BuyerSlice.reducer;