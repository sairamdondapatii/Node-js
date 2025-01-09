import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AllNotes.module.css'

const AllNotes = () => {
    const [notes,setNotes] = useState([])
    const fetchData = async ()=>{
        try {
            const response = await fetch('http://localhost:8090/notes/',{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            const notesdata = await response.json()
            setNotes(notesdata)
        } catch (error) {
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
        {notes.length === 0 && <div>
            <h3 style={{textAlign:'center'}}>No Notes found</h3>
            </div>}
        {notes.map((note)=>{
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