import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setBuyer } from '../toolkit/slices/buyerSlice';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [data, setData] = useState({
        email: '',
        password: ''

    })

    const dispatch = useDispatch();

    const nav = useNavigate()

    function handlelogin(e){
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/buyerlogin`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((d) => {
            if(d.data.success){
                toast.success(d.data.message)
                dispatch(setBuyer(d.data.buyer))
                nav('/profile')
            }
            else{
                toast.error(d.data.message)
            }
        })
        .catch((err) => {
            toast.error(err.message)
            // console.log(err)
        })
    }


  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
         <Toaster
                  position="top-center"
                  reverseOrder={false}
                />
        <div className='flex flex-col items-center mt-28'>
                <h1 className='text-center text-[22px] lg:text-[24px] font-bold'>Login Now</h1>

        <form action="" onSubmit={handlelogin} className='flex w-full flex-col items-center gap-3 mt-8'>
            <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="email" placeholder='Email' value={data.email} onChange={(e) => setData(p => ({...p, email: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md'
                type="password" placeholder='Password' value={data.password} onChange={(e) => setData(p => ({...p, password: e.target.value}))} />
                <input
                    className='w-full lg:w-[380px] p-[8px] rounded-md bg-[#444444] text-white font-bold'
                type="submit" value={'Login'} />
        </form>
        </div>
    </div>
  )
}

export default Login