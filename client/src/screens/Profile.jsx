import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBuyer } from '../toolkit/slices/buyerSlice';

function Profile() {
    const buyer = useSelector((d) => d.user.isBuyer);

    const nav = useNavigate()
    const dispatch = useDispatch()

    function handlelogout(){
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/buyerlogout`, {
            withCredentials: true
        })
        .then((d) => {
            
                toast.success('successfully logout')
                dispatch(setBuyer(null))
                nav('/')
            
        })
        .catch((err) => {
            toast.error(err.message)
        })
    }

  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
         <Toaster
                          position="top-center"
                          reverseOrder={false}
                        />
        <h1 className='text-[20px] lg:text-[22px] text-center lg:font-bold mt-16'>My Profile</h1>
        <div className='text-[18px] text-violet-800 lg:text-[22px] mt-8'>
            <h1 className='capitalize'>Name: <span className='text-black'>{buyer?.fullname}</span></h1>
            <h1>Email: <span className='text-black'>{buyer?.email} </span></h1>
            <h1>Phone: <span className='text-black'>{buyer?.phone} </span></h1>
            <h1>District: <span className='text-black'>{buyer?.district} </span></h1>
            <h1>Location: <span className='text-black'>{buyer?.location} </span></h1>
        </div>
        <button onClick={() => handlelogout()} className='p-[8px_16px] bg-red-600 text-white mt-5 rounded-full'>Logout</button>
    </div>
  )
}

export default Profile