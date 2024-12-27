import React, { useEffect, useState } from 'react'
import getMyOrders from '../hooks/getMyOrders'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { setOrders } from '../toolkit/slices/buyerSlice';

function BuyerOrders() {
    const [load, setLoad] = useState(true)
    
    

   
      getMyOrders()
      const orders = useSelector((d) => d.user.orders)
      
      useEffect(() => {
        if(orders?.length > 0){
          setLoad(false)
        }
      }, [orders])
    
    


    const dispatch = useDispatch()

    function buyerdone(idx){
      // alert(idx)
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/buyerdone`, {orid: idx}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((d) => {
          const updox = orders.map(v => v._id === idx ? d.data.order : v);
          dispatch(setOrders(updox))
          toast.success(d.data.message)
      })
      .catch((err) => toast.error(err.message))
    }

  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
       <Toaster
                              position="top-center"
                              reverseOrder={false}
                            />
        <h1 className='text-center text-[18px] font-bold lg:text-[22px] mt-14'>My Order List</h1>
        { 
            orders?.length > 0 ? <div className='flex flex-col gap-3 mt-6'>
                {
                  orders?.map((e,i) => {
                    return <div key={i} className={`${e.buyerdone ? 'bg-green-200' : 'bg-slate-300'} p-4`}>
                        <div className='w-full grid grid-cols-2 lg:grid-cols-8 gap-3'>
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
                            <h1>Delivery charge: 2$ (when you get the delivery you need to pay the delivery charge)</h1>
                          </div> : 
                          <h1 className='mt-4'>Total: {e.total}$ (include delivery charge)</h1>
                        }
                        <h1>Payment Method: {e.pm}</h1>
                        <h1>Order date: {e.createdAt}</h1>

                        {
                          e.sellerdone ? 
                            e.buyerdone ? <p className='bg-green-400 inline-block p-[6px_12px] rounded-full text-white  mt-4'>Order completed</p> : <button onClick={() => buyerdone(e._id)} className='mt-4 bg-sky-400 text-white rounded-full  p-[6px_12px]'>Got the order</button>
                           : <p className='mt-4'>Order is on the way</p>
                        }
                        
                    </div>
                  })
                }
            </div>
            : 
            
              load ? <h1>Loading...</h1> : <h1>No order found</h1>
              
            
            // <p>No order found</p>
        }
    </div>
  )
}

export default BuyerOrders