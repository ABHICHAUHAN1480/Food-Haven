import React from 'react'
import Confetti from 'react-confetti'
const Booked = ({bookedid,setbookedid,tableno}) => {
return (
    <div className='w-[70%] md:w-[50%] lg:w-[40%] absolute h-[85%] flex flex-col justify-center items-center text-gray-900 border-2 border-gray-800 p-10 rounded-2xl shadow-2xl bg-white animate-fade-in'>
  
    
  
    
    <lord-icon
      src="https://cdn.lordicon.com/zqfagoml.json"
      trigger="loop"
      state="loop-pulse"
      colors="primary:#f97316,secondary:#10b981"
      style={{ width: "120px", height: "120px" }}>
    </lord-icon>
  
    <h1 className='text-4xl font-extrabold mb-4 text-gray-900 tracking-wide'>Your Table is Booked! </h1>
  
    
    <div className='text-center bg-gray-100 shadow-md px-6 py-4 rounded-lg w-full max-w-md'>
      <p className='text-2xl font-medium text-gray-700 mb-2'>Booking ID: <span className='font-bold text-orange-500'>{bookedid}</span></p>
      <p className='text-2xl font-medium text-gray-700'>Table No: <span className='font-bold text-green-500'>3{tableno}</span></p>
    </div>
  

    <p className='text-xl mt-6 text-gray-600 text-center leading-relaxed'>
      Thank you for choosing us! We can't wait to serve you a delightful experience. 🍽️✨
    </p>
  
   
    <button
      onClick={() => setbookedid("")}
      className='mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg'>
      Close
    </button>
  </div>
  
)
}

export default Booked
