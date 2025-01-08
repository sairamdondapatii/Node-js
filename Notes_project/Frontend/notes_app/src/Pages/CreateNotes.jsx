import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './CreateNotes.module.css'

const CreateNotes = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('')
    const [category,setCategory] = useState('')
    const payload = {title,body,category}
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(payload)
        try {
            const response = await fetch('http://localhost:8090/notes/create',{
                method:"POST",
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(payload)
            })
            const notesdata = await response.json()
            notesdata && navigate('/notes'); 
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit} method='POST' className={styles.form}>
            <h1>Creat a new note</h1>
            <input type='text' className={styles.input} placeholder='Title of the note' required value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <textarea placeholder='Body' className={styles.textarea} required value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
            <input type='category' className={styles.input} placeholder='category' required  value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <button type='submit' className={styles.btn}>Create Note</button>
        </form>
    </div>
  )
}

export default CreateNotes