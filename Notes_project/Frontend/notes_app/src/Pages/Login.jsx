import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import './Login.css'
import { useGlobalContext } from '../context/AuthcontextProvider';
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const payload = {
        email,
        password
    }
    const navigate = useNavigate()
    const {setAuth} = useGlobalContext()
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch('http://localhost:8090/users/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then(response => {
            return response.json()
        }).then(data =>{
            data.token && localStorage.setItem('token',data.token)
            setAuth(data.token)
            setEmail('')
            setPassword('')
            data.token && navigate('/notes')
        }).catch(error =>{
            console.log(error)
        })
    }


  return (
    <div className="login-container"> 
        <form onSubmit={handleSubmit} className="login-form" method='post'>
            <h1>Login</h1>
            <input type='email' placeholder='Enter your Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Login</button> 
        </form> 
    </div>
  )
}


export default Login