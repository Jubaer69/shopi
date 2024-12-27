import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import getAllProducts from '../hooks/getAllProducts'

function Products() {
  const [load, setLoad] = useState(true)
    getAllProducts()
    const products = useSelector((d) => d.user.allProducts)

    useEffect(() => {
            if(products?.length > 0){
              setLoad(false)
            }
          }, [products])

  return (
    <div className='w-full min-h-screen p-[60px_5%] lg:p-[60px_10%]'>
        <h1 className='text-[22px] lg:text-[24px] text-center mt-16 font-bold'>All Products</h1>
        <div className='w-full grid grid-cols-1 lg:grid-cols-5 mt-6 items-center gap-6 px-5 lg:px-0'>
            {
                products?.length > 0 ? 
                    products.map((e,i) => {
                    return <Card key={i} id={e._id} data={e} image={e.image} price={e.price} name={e.name} />
                })
                 : load ? <p>Loading...</p> : <p>No products add yet</p>
            }
        </div>
    </div>
  )
}

export default Products