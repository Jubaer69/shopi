import React, { useEffect, useState } from 'react'
import adminsOrder from '../hooks/adminsOrder'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { setOrder } from '../toolkit/slices/adminSlice';

function AdminOrder() {

  const [load, setLoad] = useState(true)

    adminsOrder();
    const adorder = useSelector((d) => d.admin.order)

    useEffect(() => {
            if(adorder?.length > 0){
              setLoad(false)
            }
          }, [adorder])
        

    const dispatch = useDispatch();

    function sellerdone(idx){
      // alert('seller done')
     

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/admin/sellerdone`, {orid: idx}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((d) => {
        toast.success(d.data.message)
        const updox = adorder.map(v => v._id === idx ? v = d.data.updatedOrder : v)
        dispatch(setOrder(updox))
      })
      .catch((err) => toast.error(err.message))


    }

  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
        <Toaster
                        position="top-center"
                        reverseOrder={false}
                      />
        <h1 className='text-center text-[20px] lg:text-[24px] font-bold mt-20'>'Orders'</h1>

        {
            adorder?.length > 0 ? <div className='mt-6 flex flex-col items-center gap-4'>
                {
                  adorder?.map((e,i) => {
                      return <div className={`w-full ${e.sellerdone ? 'bg-green-200' : 'bg-slate-200'} p-4`}>
                          <div className='bg-slate-800 inline-block rounded-lg p-3 text-white'>
                            <p className='text-center'>'Client Details'</p>
                              <h1 className='capitalize mt-1'>Name: {e.customer.fullname}</h1>
                            <h1>Phone: {e.customer.phone}</h1>
                            <h1>Address: {e.customer.district}, {e.customer.location}</h1>
                          </div>

                          <div className='w-full grid grid-cols-2 lg:grid-cols-8 gap-3 mt-4'>
                        {
                          e.items.map((e, i) => {
                            return <div key={i} className='w-full'>
                              <img className='w-[100px] h-[100px] object-cover' src={e.product.image} alt="" />
                              <h1>{e.product.name}</h1>
                              <h1>Quantity: {e.quantity} pcs</h1>
                            </div>
                          })
                        }
                        </div>

                        {
                          e.pm === 'Stripe' ? <div className='mt-4'>
                            <h1 >Payed: {e.total - 2}$</h1>
                            <h1>Delivery charge: 2$ (Due)</h1>
                          </div> : 
                          <h1 className='mt-4'>Total: {e.total}$ (include delivery charge)</h1>
                        }
                        <h1>Payment Method: {e.pm}</h1>
                        <h1>Order date: {e.createdAt}</h1>

                       {
                          e.sellerdone ? <p className='bg-black text-white p-[6px_12px] inline-block mt-2 rounded-full'>Order completed</p>
                          :  <button onClick={() => sellerdone(e._id)} className='mt-2 bg-cyan-500 text-black font-bold p-[8px_16px] rounded-md'>Order Handover</button>
                       }

                      </div>
                  })
                }
            </div>
            : 
            load ? <h1>Loading...</h1> : <h1>No order found</h1>
        }

    </div>
  )
}

export default AdminOrder