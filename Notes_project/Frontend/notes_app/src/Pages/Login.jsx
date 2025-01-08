import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const payload = {
        email,
        password
    }
    const navigate = useNavigate()
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
            localStorage.setItem('token',data.token)
            setEmail('')
            setPassword('')
            data && navigate('/notes')
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