import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Order from './Pages/Order'


const App = () => {
  return (<>
   
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order/>}/>
      </Routes>
   
    </>
  )
}

export default App
