import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';
const PrivateRoutes = () => {
    const {currentUser} = useAuth;
    return(
      currentUser ? <Outlet/> : <Navigate to="/dashboard"/>
    )
}

export default PrivateRoutes