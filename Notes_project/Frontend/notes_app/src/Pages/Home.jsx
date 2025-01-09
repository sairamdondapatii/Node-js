import React from 'react'
import { useGlobalContext } from '../context/AuthcontextProvider'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
const Home = () => {
  const {auth} = useGlobalContext()

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.main_content}>
          <h1>The simplest way to keep notes</h1>
          <p>All your notes, synced on all your devices. Get Simplenote now for iOS, Android, Mac, Windows, Linux, or in your browser.</p>
          {auth ? <Link to='/notes'>Your Notes</Link> : <Link to='/login'>Login</Link> }
        </div>
      </div>
    </div>
  )
}

export default Home