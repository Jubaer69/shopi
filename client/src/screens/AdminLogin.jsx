import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAdmin } from '../toolkit/slices/adminSlice';

function AdminLogin() {
    const [password, setPassword] = useState();

    const nav = useNavigate()

    const dispatch = useDispatch()


    function handleadmin(e){
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/admin/adminlogin`, {password: password}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((d) => {
            if(d.data.success){
                toast.success(d.data.message)
                dispatch(setIsAdmin(true))
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
        <h1 className='text-center text-[20px] lg:text-[24px] font-bold mt-28'>Admin Login</h1>

        {/* <div className='w-full flex  items-center justify-center mt-8 '> */}
        <form onSubmit={handleadmin} action="" className='flex w-full items-center justify-center mt-8 flex-col gap-2 mx-auto'>
            <input
                className='w-full lg:w-[340px] bg-white p-2'
            type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className='w-full lg:w-[340px] bg-indigo-600 text-white p-2' type="submit" value={'Login'} />
        </form>
        {/* </div> */}
    </div>
  )
}

export default AdminLogin