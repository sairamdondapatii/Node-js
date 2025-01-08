import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [age,setAge] = useState('');
    const [password,setPassword] = useState('');
    const payload = {
        name,
        email,
        age,
        password
    }
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch('http://localhost:8090/users/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then(response => {
            return response.json()
        }).then(data =>{
            console.log(data)
            setName('')
            setEmail('')
            setAge('')
            setPassword('')
            data && navigate('/login')
        }).catch(error =>{
            console.log(error)
        })
    }


  return (
    <div className='signup-container'>
        <form onSubmit={handleSubmit} method='post' className='signup-form'>
            <h1>Signup</h1>
            <input type='text' placeholder='Enter your name' required value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type='email' placeholder='Enter your Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type='text' placeholder='Enter your age' required  value={age} onChange={(e)=>setAge(e.target.value)}/>
            <input type='password' placeholder='Enter your password' required value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit'>Signup</button>
        </form>
    </div>
  )
}
export default Signup