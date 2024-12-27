import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {

     const [data, setData] = useState({
            email: '',
            password: '',
            fullname: '',
            phone: '',
            district: '',
            location: ''
    
        })

        const nav = useNavigate()

        function handleregsiter(e){
            e.preventDefault()

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/buyerregister`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((d) => {
                if(d.data.success){
                    toast.success(d.data.message)
                    setData({
                        email: '',
                        password: '',
                        fullname: '',
                        phone: '',
                        district: '',
                        location: ''
                    })
                    nav('/login')
                }
                else{
                    toast.error(d.data.message)
                }
            
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
        <div className='flex flex-col items-center mt-28'>
                <h1 className='text-center text-[22px] lg:text-[24px] font-bold'>Register Now</h1>

        <form action="" onSubmit={handleregsiter} className='flex w-full flex-col items-center gap-3 mt-8'>
            <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="text" placeholder='Full Name' value={data.fullname} onChange={(e) => setData(p => ({...p, fullname: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="email" placeholder='Email' value={data.email} onChange={(e) => setData(p => ({...p, email: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="password" placeholder='Password' value={data.password} onChange={(e) => setData(p => ({...p, password: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="text" placeholder='District' value={data.district} onChange={(e) => setData(p => ({...p, district: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="text" placeholder='Location' value={data.location} onChange={(e) => setData(p => ({...p, location: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="text" placeholder='Phone' value={data.phone} onChange={(e) => setData(p => ({...p, phone: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md bg-[#444444] text-white font-bold'
                type="submit" value={'Register'} />
        </form>
        </div>
    </div>
  )
}

export default Register