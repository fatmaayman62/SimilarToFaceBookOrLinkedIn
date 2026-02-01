import React, { useContext, useEffect } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContextProvider';

function ProtectedRoutes({ children }) {
  const { signed } = useContext(UserContext);
 

    return   signed ?children : <Navigate to={'/login'}/>;

  
  
}

export default ProtectedRoutes;
