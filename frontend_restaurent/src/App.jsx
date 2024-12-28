import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'

const App = () => {
  return (<>
    <h1 className='text-2xl text-center'>Welcome to the restaurant</h1>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </>
  )
}

export default App
