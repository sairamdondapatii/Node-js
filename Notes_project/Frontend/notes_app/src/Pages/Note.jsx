
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import styles from './Note.module.css'

const Note = () => {
    const {id} = useParams()
    const [notes,setNotes] = useState([])
    const [notebody,setNoteBody] = useState('')
    const navigate = useNavigate()
    const fetchData = async ()=>{
        try {
            const response = await fetch(`http://localhost:8090/notes/${id}`,{
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

    const handleDelete = async(id)=>{
        try {
            const response = await fetch(`http://localhost:8090/notes/delete/${id}`,{
                method:"DELETE",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            data && navigate('/notes')
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdate = async(id)=>{
        try {
            const response = await fetch(`http://localhost:8090/notes/update/${id}`,{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    body:notebody
                })
            });
            const data = await response.json();
            data && fetchData()
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={styles.container}>
        {notes.map((note)=>{
            const {title,body,category,authour,_id:id} = note;
            return (
                <div className={styles.note}  key={id}>
                    <h1>Title: {title}</h1>
                    <textarea className={styles.textarea}  type='text' defaultValue={body} onChange={(e)=> setNoteBody(e.target.value)}/>
                    {/* <p>{category}</p>
                    <p>{authour}</p> */}
                    <div className={styles.btngroup}>
                        <button className={styles.btn} onClick={()=>{handleDelete(id)}}>Delete Note</button>
                        <button className={styles.btn} onClick={()=>{handleUpdate(id)}}>Update Note</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Note