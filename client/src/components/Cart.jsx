import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCart, setCart, setIsOpen } from '../toolkit/slices/buyerSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';

function Cart() {

   

    const isOpen = useSelector((d) => d.user.isOpen)
    const isBuyer = useSelector((d) => d.user.isBuyer)
    const cart = useSelector((d) => d.user.cart)
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0)

    const nav = useNavigate()
    

    function fnClose(){
        dispatch(setIsOpen(false))
    }

    function decr(jubx){
        // alert(jubx)
        const temp = cart.find(v => v.product._id === jubx);
        let voda = {
            product: temp.product,
            quantity: temp.quantity <= 1 ? 1 : temp.quantity - 1,
            price: temp.price
        }
        // console.log(voda)
        dispatch(setCart(voda))
    }

    function incr(jubx){
        const temp = cart.find(v => v.product._id === jubx);
        let voda = {
            product: temp.product,
            quantity: temp.quantity >= 5 ? 5 : temp.quantity + 1,
            price: temp.price
        }
        // console.log(voda)
        dispatch(setCart(voda))
    }

    useEffect(() => {
        const gg = cart?.reduce((acc, val) => acc + val.price * val.quantity, 0);
        setTotal(gg)
        // console.log(gg)
    }, [cart])


    function remItem(jubx){
        const gg = cart?.filter(v => v.product._id !== jubx);
        dispatch(removeCart(gg))
        // console.log(gg)
    }

    function cashond(){
        // alert('cash on delivery')

        if(isBuyer){

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/orderkoro`, {
                customer: isBuyer?._id,
                items: cart,
                pm: 'Cash on delivery',
                total: total+2
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then((d) => {
                if(d.data.success){
                    toast.success(d.data.message)
                    dispatch(removeCart([]))
                    nav('/myorders')
                }
                else{
                    toast.error(d.data.message)
                }
            })
            .catch((err) => {
                toast.error(err)
            })
        }
        else{
            toast.error('Please login to proceed')
            nav('/login')
        }

    }

    async function payment(){
        const stripe = await loadStripe('pk_test_51QHVVSHBLwwfECaNhsFnhIOHJQ4pHBukSBgBAwcEBVyGDAU4Xk8WnE81nSfJ0LgF5MICkNjNYHK0GAxKCOs60pgv00CACM0rgB');

        axios.post(`${import.meta.env.BACKEND_URL}/api/v4/buyer/stripecheck`, {items: cart}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((d) => {
            const result = stripe.redirectToCheckout({
                sessionId: d.data.id
            })
            if(result.error){
                console.log(result.error)
            }
        })
        .catch((err) => toast.error(err.message))

        
    }

    
  return (
    <div className={`fixed z-[300] transition-all  duration-500 ${isOpen ? 'right-0' : 'right-[-100%]'} top-0 w-full lg:w-[35%] h-screen bg-black`}>
        <Toaster
                          position="top-center"
                          reverseOrder={false}
                        />
        <h1 className='text-[20px] text-white text-center mt-6'>My Cart</h1>
        <div onClick={() => fnClose()} className='text-[20px] cursor-pointer text-white absolute right-4 top-4 lg:left-4'><i className="ri-close-large-fill"></i></div>

        {
            cart?.length > 0 ? <div className='px-4 flex-col mt-6 flex items-center gap-2 h-[500px] overflow-y-auto '>
                {
                    cart?.map((e,i) => {
                        return <div className='w-full border-b border-white/[0.5] py-2 flex items-center gap-3 justify-between'>
                            <div className='flex items-center gap-2 lg:gap-5'>
                            <img className='w-[50px] lg:w-[80px] h-[50px] lg:h-[80px] object-cover' src={e.product.image} alt="" />
                            
                            <div className='text-white'>
                                <p className='font-bold text-[14px] lg:text-[20px]'>{e.product.name}</p>
                                <p className='text-[14px] lg:text-[20px]'>{e.product.price}$</p>
                                <i onClick={() => remItem(e.product._id)} className="ri-delete-bin-line text-red-500 cursor-pointer"></i>
                            </div>
                            </div>
                            <div className=' flex items-center gap-3'>
                            <button onClick={() => decr(e.product._id)}  className='bg-white text-black w-[30px] h-[30px] lg:h-[40px] lg:w-[40px] rounded-full text-[22px] lg:text-[28px]'><i class="ri-arrow-left-double-fill"></i></button>
                            <p className='text-white'>{e.quantity}</p>
                            <button onClick={() => incr(e.product._id)}  className='bg-white text-black w-[30px] h-[30px] lg:h-[40px] lg:w-[40px] rounded-full text-[22px] lg:text-[28px]'><i class="ri-arrow-right-double-fill"></i></button>
                            </div>
                        </div>
                    })
                }
                
            </div> : <p className='text-red-500 mt-28 text-center'>No items found, <br />your cart is empty</p>
        }

                {
                    cart?.length > 0 && <div className='text-[16px] text-white/[0.7] px-4 lg:text-[18px]'>
                    <h2>Total: {total}$</h2>
                    <h2>Delivery charge: 2$</h2>
                    <h2 className='mt-3'>Sub total: <span className='bg-blue-400 text-white font-bold px-4 py-2 rounded-full'>{total + 2}$</span></h2>

                    <p className='text-[14px] mt-2'>Choose a payment method</p>
                    <div className='flex items-center gap-2 mt-2'>
                        <button onClick={() => cashond()} className='p-[10px_18px] font-bold text-black rounded-full bg-orange-400'>COD</button>
                        <button onClick={() => payment()} className='p-[10px_18px] font-bold text-black rounded-full bg-violet-400'>Stripe</button>
                    </div>
                </div>
                }
    </div>
  )
}

export default Cart