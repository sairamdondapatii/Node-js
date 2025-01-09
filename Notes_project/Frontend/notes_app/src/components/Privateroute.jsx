import React from 'react'
import { useGlobalContext } from '../context/AuthcontextProvider';
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {
    const {auth} = useGlobalContext()
    if(auth){
        return children
    }
  return (
    <Navigate to='/login'/>
  )
}

export default Privateroute