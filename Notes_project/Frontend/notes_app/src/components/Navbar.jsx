import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)
    const toggelMenu = ()=>{
        setIsOpen(!isOpen)
    }
    const closeMenuOnClick = ()=>{
        setIsOpen(false)
    }
    
  return (
    <div className={styles.navbarcontainer} >
        <nav className={styles.navbar}>
            <div className={styles.navLogo}>
               Quicknote
            </div>
            <div className={styles.navlinksLg} >
                <Link className={styles.lgA} to='/'>Home</Link>
                <Link className={styles.lgA} to='/notes'>Notes</Link>
                <Link className={styles.lgA} to='/createnote'>Create Notes</Link>
            </div>
            <div className={styles.hamburgerMenu}>
                <button className={styles.hamburgerMenuButton} onClick={toggelMenu}>{isOpen ? <CgClose className={styles.icon}/> :<FaBarsStaggered className={styles.icon} /> }</button>
            </div>
        </nav>
        {/* mobile nav links  */}
        <div className={`${styles.navlinksSm} ${isOpen && styles.open}`}>
            {/* navlinks */}
            <Link className={styles.smA} to='/'  onClick={closeMenuOnClick} >Home</Link>
            <Link className={styles.smA} to='/notes' onClick={closeMenuOnClick} >Notes</Link>
            <Link className={styles.smA} to='/createnote' onClick={closeMenuOnClick} >CreateNotes</Link>
        </div>
        {isOpen && <div className={styles.backdrop} onClick={closeMenuOnClick}></div>}
    </div>
  )
}

export default Navbar