import React from 'react'
import getAllProducts from '../hooks/getAllProducts'

function Home() {
  getAllProducts()
  return (
    <div className='w-full lg:p-[60px_10%] p-[60px_5%]'>
        <div className='flex items-center flex-col mt-[150px]'>
            <h1 className='lg:text-[60px] text-[30px] font-bold text-center'>Shopi is the best shop where you can buy premium bags</h1>
            <button className='w-[200px] tex-[20px] mt-[40px] p-[14px] rounded-full border border-black'>View All Products</button>
        </div>
    </div>
  )
}

export default Home