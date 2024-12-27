import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setCart } from '../toolkit/slices/buyerSlice';
import toast, { Toaster } from 'react-hot-toast';

function ProductView() {
    const {id} = useParams()
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()

    const [data, setData] = useState(null)
    const products = useSelector((d) => d.user.allProducts)

    useEffect(() => {
        const gg = products.find(v => v._id === id);
        console.log(gg)
        setData(gg)
    }, [])

    function addcart(){
        toast.success('Item added successfully')
        dispatch(setCart({
            product: data,
            quantity: quantity,
            price: data.price
        }))
    }

  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
         <Toaster
                          position="top-center"
                          reverseOrder={false}
                        />
        {
            data ? <div className='w-full mt-20 flex flex-col gap-5 lg:gap-12 lg:flex-row lg:items-center'>
                <img className='w-full lg:w-[400px] h-[300px] lg:h-[400px] object-cover' src={data.image} alt="" />
                <div>
                    <h3 className='text-[24px] lg:text-[30px] font-bold'>{data.name}</h3>
                    <p className='text-[16px] lg:text-[18px] mt-2'>{data.description}</p>
                    <p className='text-[18px] lg:text-[20px] mt-2 font-bold'>{data.price}$</p>

                    <div className='flex items-center gap-3 text-[20px] mt-5'>
                    <button onClick={() => setQuantity(p => p <= 1 ? 1 : p - 1)}  className='bg-violet-400 text-white w-[40px] h-[40px] rounded-full text-[30px]'><i class="ri-arrow-left-double-fill"></i></button>
                    <h2>{quantity}</h2>
                    <button onClick={() => setQuantity(p => p >= 5 ? 5 : p + 1)} className='bg-violet-400 text-white w-[40px] h-[40px] rounded-full text-[30px]'><i class="ri-arrow-right-double-line"></i></button>
                </div>
                <p className='mt-4'>{data.quantity > 0 ? 'In stock' : 'Out of stock'}</p>
                <button onClick={() => addcart()} className='lg:w-[250px] mt-2 w-full text-white bg-violet-400 p-3 text-[16px] lg:text-[18px]'>Add to cart</button>
                </div>
                
            </div>

            : <p>Something went wrong</p>
        }
    </div>
  )
}

export default ProductView