import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCart } from '../toolkit/slices/buyerSlice'
import toast, { Toaster } from 'react-hot-toast';

function Card({image, name, price, id, data}) {
  const nav = useNavigate()

  const dispatch = useDispatch()

  function addCart(){
    toast.success('Successfully added!')
              dispatch(setCart({
                  product: data,
                  quantity: 1,
                  price: price
              }))
  }

  return (
    <div >
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <img className='w-full  h-[240px] lg:h-[220px] object-cover' src={image} alt="" />
        <h3 onClick={() => nav(`/products/${id}`)} className='text-[20px] cursor-pointer font-bold mt-2'>{name}</h3>
        <h3>{price} $</h3>
        <button onClick={() => addCart()} className='w-full bg-blue-400 mt-1 text-white p-2'>Add to cart</button>
    </div>
  )
}

export default Card