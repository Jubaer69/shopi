import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOrders } from '../toolkit/slices/buyerSlice'

function getMyOrders() {
    const dispatch = useDispatch()

  return useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/buyer/getmyorders`, {
          withCredentials: true
        })
        .then((d) => {
            console.log(d.data.myOrders)
            dispatch(setOrders(d.data.myOrders))
        })
        .catch((error) => console.log(error))
  }, [])
}

export default getMyOrders