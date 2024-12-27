import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function IsUser({children}) {
    const isBuyer = useSelector((d) => d.user.isBuyer);

    return  isBuyer ? children : <Navigate to={'/login'} />
        

}

export default IsUser