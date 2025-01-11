
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import styles from './Note.module.css'
import Loading from '../components/Loading'

const Note = () => {
    const {id} = useParams()
    const [notes,setNotes] = useState([])
    const [notebody,setNoteBody] = useState('')
    const navigate = useNavigate()
    const [isloading , setIsloading] = useState(true)

    const payload = notebody === '' ? notes.body : notebody;

    const fetchData = async ()=>{
        try {
            setIsloading(true)
            const response = await fetch(`https://notes-backend-o9fm.onrender.com/notes/${id}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            const notesdata = await response.json()
            setNotes(notesdata)
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log(error)

        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleDelete = async(id)=>{
        try {
            setIsloading(true)
            const response = await fetch(`https://notes-backend-o9fm.onrender.com/notes/delete/${id}`,{
                method:"DELETE",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setIsloading(false)
            data && navigate('/notes')
            console.log(data);
        } catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }
    const handleUpdate = async(id)=>{
        try {
            setIsloading(true)
            const response = await fetch(`https://notes-backend-o9fm.onrender.com/notes/update/${id}`,{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    body:payload
                })
            });
            const data = await response.json();
            setIsloading(false)
            data && fetchData()
            console.log(data);
        } catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }
    if(isloading){
       return <Loading/>
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
                        <button className={styles.btn} onClick={()=>{handleDelete(id)}}>{isloading ? 'Deleting...':'Delete Note'}</button>
                        <button className={styles.btn} onClick={()=>{handleUpdate(id)}}>{isloading ? 'Updating...' : 'Update Note'}</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Note