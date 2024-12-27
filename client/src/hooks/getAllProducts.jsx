import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { setAllProducts } from '../toolkit/slices/buyerSlice';

function getAllProducts() {
    const dispatch = useDispatch()

  return useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/admin/allproducts`)
        .then((d) => {
            console.log(d.data.allProducts)
            dispatch(setAllProducts(d.data.allProducts))
        })
        .catch((error) => console.log(error))
  }, [])
}

export default getAllProducts