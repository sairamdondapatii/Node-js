import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './CreateNotes.module.css'

const CreateNotes = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('')
    const [category,setCategory] = useState('')
    const payload = {title,body,category}
    const navigate = useNavigate()
    const [isloading,setIsloading] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(payload)
        try {
            setIsloading(true)
            const response = await fetch('https://notes-backend-o9fm.onrender.com/notes/create',{
                method:"POST",
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(payload)
            })
            const data = await response.json()
            setIsloading(false)
            console.log(data)
            data && navigate('/notes'); 
        } catch (error) {
            setIsloading(false)
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
            <button type='submit' className={styles.btn}>{isloading ? 'Creating...' : 'Create Note'}</button>
        </form>
    </div>
  )
}

export default CreateNotes