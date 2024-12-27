import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeCart, setIsOpen } from '../toolkit/slices/buyerSlice';

function Success() {
    const [total, setTotal] = useState(0)
    const cart = useSelector((d) => d.user.cart)
    const isBuyer = useSelector((d) => d.user.isBuyer)
    const nav = useNavigate()

    const dispatch = useDispatch()


    useEffect(() => {
            const gg = cart?.reduce((acc, val) => acc + val.price * val.quantity, 0);
            setTotal(gg)
            // console.log(gg)
        }, [cart])


    function handleStripe(){
        // alert(total)

        dispatch(setIsOpen(false))
        
        if(cart?.length > 0){
            const tempo = {
                customer: isBuyer?._id,
                items: cart,
                pm: 'Stripe',
                total: total + 2
            }

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/orderkoro`, tempo, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then((d) => {
                if(d.data.success){
                    dispatch(removeCart([]))
                    nav('/myorders')
                }
                else{
                    alert(d.data.message)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
        }
        else{
            alert('chala za bsdk')
        }
    }



    
    



  return (
    <div className='w-full flex items-center justify-center min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
        <div className='w-full flex  items-center justify-center p-5 lg:w-[500px] h-[200px] rounded-xl bg-white shadow-xl '>
            <div className='flex flex-col items-center'>
            <h1 className=' font-bold text-[25px] lg:text-[32px] text-green-400 text-center'>Payment Done</h1>
            <button onClick={() => handleStripe()} className='inline-block mt-8 rounded-full text-center p-[8px_16px] bg-green-400 text-black'>Go to order page</button>
            </div>
        </div>
    </div>
  )
}

export default Success