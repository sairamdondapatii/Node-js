import React, { useEffect, useState } from 'react'

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
            console.log(notesdata)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        {notes.map((note)=>{
            const {title,body,category,authour,_id:id} = note;
            return <div key={id}>
                <p>{title}</p>
                <p>{body}</p>
                <p>{category}</p>
                <p>{authour}</p>
            </div>
        })}
    </div>
  )
}

export default AllNotes