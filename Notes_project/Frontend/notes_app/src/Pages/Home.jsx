import React from 'react'
import { useGlobalContext } from '../context/AuthcontextProvider'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
const Home = () => {
  const {auth} = useGlobalContext()

  return (
    <div className={styles.container}>
        <div className={styles.main_content}>
          <h1>The simplest way to keep notes</h1>
          <p>All your notes, synced on all your devices. Get Quicknote now for iOS, Android, Mac, Windows, Linux, or in your browser.</p>
          {auth ? <Link to='/notes'>Your Notes</Link> : <Link to='/login'>Login Now</Link> }
        </div>
        <div className={styles.subcontent}>
          <h2>
          Comprehensive underneath, simple on the surface
          </h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h5>Use it everywhere</h5>
              <p>Notes stay updated across all your devices, automatically and in real time. There’s no “sync” button: It just works.</p>
            </div>
            <div className={styles.feature}>
              <h5>Stay organized</h5>
              <p>Add tags to find notes quickly with instant searching.</p>
            </div>
            <div className={styles.feature}>
              <h5>Work together</h5>
              <p>Share a to-do list, post some instructions, or publish your notes online.</p>
            </div>
            <div className={styles.feature}>
              <h5>Go back in time</h5>
              <p>Notes are backed up with every change, so you can see what you noted last week or last month.</p>
            </div>
            <div className={styles.feature}>
              <h5>Markdown support</h5>
              <p>Write, preview, and publish your notes in Markdown format.</p>
            </div>
            <div className={styles.feature}>
              <h5>Use it everywhere</h5>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni distinctio libero voluptate consectetur reprehenderit deleniti.</p>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <ul className={styles.footer_menu}>
            <li className={styles.footer_links}><Link>Contact us</Link></li>
            <li className={styles.footer_links}><Link>Home</Link></li>
            <li className={styles.footer_links}><Link>Notes</Link></li>
            <li className={styles.footer_links}><Link>Terms & conditions</Link></li>
            <li className={styles.footer_links}><Link>Privacy policy</Link></li>
            <li className={styles.footer_links}><Link>Made with learning @sairamdondapati</Link></li>
            <li className={styles.footer_links}>All rights reserved &copy;2025 </li>


          </ul>
        </div>
    </div>
  )
}

export default Home