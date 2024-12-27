import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import AdminLogin from '../screens/AdminLogin'

function IsAdmin({children}) {
    const isAdmin = useSelector((d) => d.admin.isAdmin)
  return isAdmin ? children : <Navigate to={<AdminLogin />} />
}

export default IsAdmin