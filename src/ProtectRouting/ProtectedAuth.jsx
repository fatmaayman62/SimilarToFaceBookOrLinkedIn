import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContextProvider'
import { Navigate } from 'react-router-dom';

function ProtectedAuth({children}) {
    const {signed}=useContext(UserContext);

  return signed ? <Navigate to="/" />:children;
}

export default ProtectedAuth