import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Homelayout = () => {
  return (
    <div>
        <Navbar/>
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default Homelayout