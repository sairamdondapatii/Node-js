import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/AuthcontextProvider';
const Navbar = () => {
    const {isOpen ,setIsOpen, toggelMenu,closeMenuOnClick,auth,setAuth,handleLogout} = useGlobalContext()
  return (
    <div className={styles.navbarcontainer} >
        <nav className={styles.navbar}>
            <div className={styles.navLogo}>
               Quicknote
            </div>
            <div className={styles.navlinksLg} >
                <Link to='/'>Home</Link>
                {auth ? <>
                    <Link to='/notes'>Notes</Link>
                    <Link to='/createnote'>Create Notes</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                    </>
                    : 
                    <>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </>
                }
            </div>
            <div className={styles.hamburgerMenu}>
                <button className={styles.hamburgerMenuButton} onClick={toggelMenu}>{isOpen ? <CgClose className={styles.icon}/> :<FaBarsStaggered className={styles.icon} /> }</button>
            </div>
        </nav>
        {/* mobile nav links  */}
        <div className={`${styles.navlinksSm} ${isOpen && styles.open}`}>
            {/* navlinks */}
            {/* onClick={closeMenuOnClick} */}
            <Link to='/' onClick={closeMenuOnClick}>Home</Link>
                {auth ? <>
                    <Link to='/notes' onClick={closeMenuOnClick}>Notes</Link>
                    <Link to='/createnote' onClick={closeMenuOnClick}>Create Notes</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                    </>
                    : 
                    <>
                    <Link to='/login' onClick={closeMenuOnClick}>Login</Link>
                    <Link to='/signup' onClick={closeMenuOnClick}>Signup</Link>
                </>
                }
            
        </div>
        {isOpen && <div className={styles.backdrop} onClick={closeMenuOnClick}></div>}
    </div>
  )
}

export default Navbar