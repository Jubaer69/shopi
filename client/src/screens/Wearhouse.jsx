import React, { useEffect, useState } from 'react'
import getAllProducts from '../hooks/getAllProducts'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card';
import Update from '../components/Update';
import { setIsUpdate, setUpdateElem } from '../toolkit/slices/adminSlice';

function Wearhouse() {
    const [load, setLoad] = useState(true)
    getAllProducts()
    const products = useSelector((d) => d.user.allProducts);

    useEffect(() => {
                if(products.length > 0){
                  setLoad(false)
                }
              }, [products])

    const isupdate = useSelector((d) => d.admin.isUpdate);
    const dispatch = useDispatch();


    function updatekoro(idx){
        // alert(idx)

        const find = products.find(v => v._id === idx);
        dispatch(setUpdateElem(find))
        dispatch(setIsUpdate(true))
        // console.log(find)
    }

  return (
    <div className='w-full relative min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
        {
            isupdate && <Update />  // show update component if isupdate is true from admin slice state.js
        }
        <h1 className='text-[22px] lg:text-[24px] font-bold text-center mt-20'>'Wearhouse'</h1>

        {
            products?.length > 0 ? <div className='w-full grid
            
            grid-cols-1 lg:grid-cols-5 mt-6 items-start gap-6 px-5 lg:px-0'>
                {products.map((e,i) => {
                    return <div>
                        <img src={e.image} alt="" />
                        <div className='mt-2'>
                            <h3 className='text-[18px] font-bold'>{e.name}</h3>
                            <p>Price: {e.price}$</p>
                            <p>Quantity: <span className={`${e.quantity <= 5 ? 'text-red-500' : ''}`}>{e.quantity}</span> pcs</p>
                            <p>Bikri: {e.bikri} pcs</p>
                            <button onClick={() => updatekoro(e._id)} className='p-[8px_16px] mt-2 rounded-full bg-indigo-500 text-white'>Update</button>
                        </div>
                    </div>
                })}
            </div> : load ? <p>Loading...</p> : <p>No product found</p>
        }
    </div>
  )
}

export default Wearhouse