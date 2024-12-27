import axios from 'axios'
import React, { useEffect } from 'react'
import { setOrder } from '../toolkit/slices/adminSlice'
import { useDispatch } from 'react-redux'

function adminsOrder() {

    const dispatch = useDispatch()
    
  return useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/admin/allorders`)
        .then((d) => {
            dispatch(setOrder(d.data.allOrders))
        })
        .catch((err) => console.log(err.message))
  }, [])
}

export default adminsOrder