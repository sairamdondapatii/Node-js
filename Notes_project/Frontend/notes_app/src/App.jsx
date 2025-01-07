import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import AllNotes from './components/AllNotes'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<h1>welcome</h1>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notes' element={<AllNotes/>}/>

      </Routes>
    </div>
  )
}

export default App