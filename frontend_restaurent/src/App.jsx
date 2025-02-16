import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Order from './Pages/Order'
import Fullmenu from './Components/Fullmenu'
import Reservation from './Pages/Reservation'
import Booked from './Constant/Booked'


const App = () => {
  return (<>
   
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order/>}/>
        <Route path="/menu" element={<Fullmenu/>}/>   
        <Route path="/reserve" element={<Reservation />} />  
        {/* <Route path="/booked" element={<Booked />} />   */}
      </Routes>
   
    </>
  )
}

export default App
