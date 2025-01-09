
import React, { createContext, useContext, useState } from 'react'

const Authcontext = createContext();




const AuthcontextProvider = ({children}) => {


  const [isOpen,setIsOpen] = useState(false)
      const toggelMenu = ()=>{
          setIsOpen(!isOpen)
      }
      const closeMenuOnClick = ()=>{
          setIsOpen(false)
      }
      
      // const token = localStorage.getItem('token') === 'undefined' ? null : localStorage.getItem('token');

      const [auth,setAuth] = useState(localStorage.getItem('token') || null)
      const handleLogout = ()=>{
          localStorage.removeItem('token')
          closeMenuOnClick()
          setAuth(null)
      }
  return (
    <Authcontext.Provider value={{isOpen ,setIsOpen, toggelMenu,closeMenuOnClick,auth,setAuth,handleLogout}}>
      {children}
    </Authcontext.Provider>
  )
}

export default AuthcontextProvider

export const useGlobalContext = ()=>{
  return useContext(Authcontext);
}