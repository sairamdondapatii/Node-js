import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from 'react-router-dom'
import styles from './AllNotes.module.css'
import Loading from '../components/Loading'

const AllNotes = () => {
    const [notes,setNotes] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const fetchData = async ()=>{
        try {
            setIsLoading(true)
            const response = await fetch('https://notes-backend-o9fm.onrender.com/notes/',{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            const notesdata = await response.json()
            setNotes(notesdata)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <>
        <div className={styles.container}>
        <h1>Your Notes</h1>
        <div className={styles.create}>
         <Link to='/createnote' className={styles.link} >+ New note</Link>
        </div>
        {isLoading ? <Loading/> : notes.length === 0 ? <div>
            <h3 style={{textAlign:'center'}}>No Notes found</h3>
            </div> :
         notes.map((note)=>{
            const {title,_id:id} = note;
            return (
                <div className={styles.note}  key={id}>
                    <Link to={`${id}`}  className={styles.notes}>
                        <p className={styles.p}>{title}</p>
                    </Link>
                </div>
            )
        })}
    </div>
    </>
  )
}

export default AllNotes