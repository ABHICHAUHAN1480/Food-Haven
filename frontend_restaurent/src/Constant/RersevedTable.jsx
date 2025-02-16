import React from 'react'

const RersevedTable = ({particulartable,setparticulartable}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fade-in">
   <div
  className={`w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 
    ${particulartable.reservationstatus === "Confirmed" ? "bg-white/80" : "bg-red-400"} 
    backdrop-blur-lg p-8 rounded-3xl shadow-2xl 
    transform transition-all duration-300 scale-100 
    border border-gray-200`}
>
      
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-wide">
        🎟️ Reservation Details
      </h2>
  
      {/* Details Section */}
      <div className="space-y-4 text-lg text-gray-800">
        <p>
          <span className="font-semibold text-yellow-500">🔑 Booking ID:</span> {particulartable.bookingId}
        </p>
        <p>
          <span className="font-semibold text-green-500">🙍 Name:</span> {particulartable.fullname}
        </p>
        <p>
          <span className="font-semibold text-blue-500">🕒 Time:</span> {particulartable.reservationtime}
        </p>
        <p>
          <span className="font-semibold text-purple-500">📅 Date:</span> {new Date(particulartable.reservationdate).toDateString()}
        </p>
        <p>
          <span className="font-semibold text-red-500">🍽️ Table No:</span> {particulartable.tableno}
        </p>
        <p>
          <span className="font-semibold text-indigo-500">👥 No. of People:</span> {particulartable.noofpeople}
        </p>
        {particulartable.specialrequest && (
          <p>
            <span className="font-semibold text-yellow-500">💬 Special Request:</span> {particulartable.specialrequest}
          </p>
        )}
      </div>
  
      {/* Close Button */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setparticulartable({})} 
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:ring-4 ring-orange-300"
        >
          ✖ Close
        </button>
      </div>
    </div>
  </div>
  
  
  )
}

export default RersevedTable
