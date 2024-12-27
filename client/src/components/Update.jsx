import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpdate } from '../toolkit/slices/adminSlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { setAllProducts } from '../toolkit/slices/buyerSlice';

function Update() {

    const upElem = useSelector((d) => d.admin.updateElem);
    const products = useSelector((d) => d.user.allProducts)

    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: upElem?.name || '',
        description: upElem?.description || '',
        price: upElem?.price || '',
        quantity: upElem?.quantity || '',
        image: upElem?.image || ''
    })

    function handleUpdate(e){
        e.preventDefault();
        alert(upElem?._id)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/admin/updateproduct`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((d) => {
            if(d.data.success){
                toast.success(d.data.message)
                dispatch(setIsUpdate(false))
                const upd = products?.map(v => v._id === upElem?._id ? v = d.data.updatedPro : v)
                dispatch(setAllProducts(upd))
            }
            else{
                toast.error(d.data.message)
            }
        })
        .catch((err) => toast.error(err.message))

        // alert('update hobe')
    }

  return (
    <div className='fixed transition-all top-0 left-0 h-full  text-white  w-full '>
        <Toaster
                                  position="top-center"
                                  reverseOrder={false}
                                />
        <div className='w-full h-full p-[60px_5%] lg:p-[60px_10%] relative flex justify-center overflow-y-auto'>
        <i onClick={() => dispatch(setIsUpdate(false))} className="ri-close-large-line text-[26px] mt-14 cursor-pointer font-bold text-white block absolute z-[300]"></i>
            <div className='z-[10] mt-28 w-full'>
            
                <form onSubmit={handleUpdate} className='flex w-full text-black flex-col items-center gap-3 mt-5'>
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
            className='w-full lg:w-[380px] text-black p-[8px] rounded-md bg-indigo-400  font-bold'
        type="submit" value={'Update Product'} />
</form>
            </div>


            <div onClick={() => dispatch(setIsUpdate(false))} className='w-full h-full absolute bg-black/[0.9] top-0 left-0'>
              
            </div>
            
        </div>
        
    </div>
  )
}

export default Update