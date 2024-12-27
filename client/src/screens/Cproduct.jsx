import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Cproduct() {
    const [data, setData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        quantity: ''
    })

    const nav = useNavigate()

    function handleCpost(e){
        e.preventDefault()
        // alert('hello world')

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/admin/createproduct`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((d) => {
            if(d.data.success){
                toast.success(d.data.message)
                setData({name: '', price: '', description: '', image: '', quantity: ''})
                nav('/wearhouse')
            }
            else{
                toast.error(d.data.message)
            }
        })
        .catch((err) => toast.error(err.message))
    }

  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
        <Toaster
                                position="top-center"
                                reverseOrder={false}
                              />
       <div className='flex flex-col items-center mt-28'>
       <h1 className='text-[22px] lg:text-[24px] font-bold text-center'>Create A New Product</h1>

<form action="" onSubmit={handleCpost} className='flex w-full flex-col items-center gap-3 mt-8'>
<input
            className='w-full lg:w-[380px] p-[8px] rounded-md'
        type="text" placeholder='Name' value={data.name} onChange={(e) => setData(p => ({...p, name: e.target.value}))} />
        <textarea
            className='w-full lg:w-[380px] p-[8px] rounded-md'
        type="text" placeholder='Description' value={data.description} onChange={(e) => setData(p => ({...p, description: e.target.value}))} />
        <input
            className='w-full lg:w-[380px] p-[8px] rounded-md'
        type="text" placeholder='Price' value={data.price} onChange={(e) => setData(p => ({...p, price: e.target.value}))} />
        <input
            className='w-full lg:w-[380px] p-[8px] rounded-md'
        type="text" placeholder='Image URL' value={data.image} onChange={(e) => setData(p => ({...p, image: e.target.value}))} />
        <input
            className='w-full lg:w-[380px] p-[8px] rounded-md'
        type="text" placeholder='Quantity' value={data.quantity} onChange={(e) => setData(p => ({...p, quantity: e.target.value}))} />
        <input
            
            className='w-full lg:w-[380px] cursor-pointer p-[8px] rounded-md bg-[#444444] text-white font-bold'
        type="submit" value={'Create Product'} />
</form>
       </div>
    </div>
  )
}

export default Cproduct