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
    const [isloading,setIsloading] = useState(false)
    const navigate = useNavigate()
    const {setAuth} = useGlobalContext()
    const handleSubmit = (e)=>{
        e.preventDefault()
        setIsloading(true)
        fetch('https://notes-backend-o9fm.onrender.com/users/login',{
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
            console.log(data)
            setIsloading(false)
            data.token && navigate('/notes')
        }).catch(error =>{
            setIsloading(false)
            console.log(error)
        })
    }


  return (
    <div className="login-container"> 
        <form onSubmit={handleSubmit} className="login-form" method='post'>
            <h1>Login</h1>
            <input autoComplete='on' type='email' placeholder='Enter your Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input autoComplete='on' type='password' placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>{isloading ? 'Logining...' : 'Login'}</button> 
        </form> 
    </div>
  )
}


export default Login