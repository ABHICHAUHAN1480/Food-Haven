import React from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Reservation = () => {
    const [loading, setloading] = useState(false);
    const [toggle, settoggle] = useState(true);
    return (
        <>
            <Navbar />
            {loading && (
                <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center gap-4">
                        <lord-icon
                            src="https://cdn.lordicon.com/dupxuoaa.json"
                            trigger="loop"
                            state="loop-transparency"
                            colors="primary:#ffffff"
                            style={{ width: 80, height: 80 }}
                        ></lord-icon>
                        <span className="text-white text-lg font-medium">Loading, please wait...</span>
                    </div>
                </div>
            )}
            <div className='min-h-[50vh] text-gray-900 bg-gradient-to-b from-orange-50 to-gray-100'>
                <div className='flex flex-col items-center gap-4 py-12 px-4 text-center'>
                    <h1 className='text-4xl font-bold text-gray-900 md:text-5xl'>Reserve Your Perfect Table</h1>
                    <p className='text-lg text-gray-600 max-w-2xl'>
                        Experience fine dining at its best. Secure your table in advance and enjoy a seamless culinary journey.
                    </p>
                </div>
                <button onClick={() => settoggle(prev => !prev)} className='bg-white md:hidden text-orange-500 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mt-8'>{toggle ? "Ckeched booked" : "Reserve Table"}</button>


                <div className='flex items-center justify-center min-h-[50vh] p-4 sm:p-6'>
                    <div className='w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl'>
                        <div className='grid md:grid-cols-2'>
                            {/* Decorative Section */}
                            <div className='hidden md:flex flex-col  justify-between  bg-gradient-to-br from-orange-500 to-orange-700 p-8 text-white'>
                                <span><lord-icon
                                    src="https://cdn.lordicon.com/mwikjdwh.json"
                                    trigger="loop"
                                    colors="primary:#ffffff"
                                    style={{ width: "45px", height: "45px" }}
                                >
                                </lord-icon>
                                    <h2 className='text-4xl font-semibold mb-16'>Why Choose Us?</h2>
                                    <ul className='space-y-2 text-sm opacity-90'>
                                        <li className='items-center flex '><lord-icon
                                            src="https://cdn.lordicon.com/mzghzwpo.json"
                                            trigger="loop"
                                            colors="primary:#ffffff"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon> Priority seating for online reservations</li>
                                        <li className='flex items-center'><lord-icon
                                            src="https://cdn.lordicon.com/mhnfcfpf.json"
                                            trigger="loop"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon> Special offers & exclusive deals</li>
                                        <li className='flex items-center'><lord-icon
                                            src="https://cdn.lordicon.com/pogxzkfo.json"
                                            trigger="loop"
                                            colors="primary:#ffffff"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon> Flexible cancellations</li>
                                        <li>🌟 Personalized service</li>
                                    </ul></span>
                                <button onClick={() => settoggle(prev => !prev)} className='bg-white text-orange-500 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mt-8'>{toggle ? "Ckeched booked" : "Reserve Table"}</button>
                                <div className='mt-6'>
                                    <p className='text-sm'>📍 123 Fine Dine Street, vijay vihar, delhi</p>
                                    <p className='text-sm'>📧 reservations@foodheaven.com</p>
                                    <p className='text-sm'>📞 +1 (555) 123-4567</p>
                                </div>
                            </div>

                            {/* Form jo toggle krega */}
                            {toggle ?
                                <div className='p-8'>
                                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Book Your Experience</h2>
                                    <p className='text-gray-500 mb-6'>We'll confirm your reservation within 24 hours</p>

                                    <form className='space-y-5'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
                                            <input type='text' required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='John Doe' />
                                        </div>

                                        <div className='grid gap-5 sm:grid-cols-2'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number *</label>
                                                <input type='tel' required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='+1 (555) 000-0000' />
                                            </div>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                                                <input type='email' required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='john@example.com' />
                                            </div>
                                        </div>

                                        <div className='grid gap-5 sm:grid-cols-2'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Date *</label>
                                                <input type='date' min={new Date().toISOString().split('T')[0]} style={{ colorScheme: "light" }} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' />
                                            </div>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Time (10:00 to 22:00)*</label>
                                                <input type='time' min='10:00' max='22:00' className='w-full  px-4 py-3  rounded-lg border border-gray-300  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all  bg-gray-100' style={{ colorScheme: "light" }} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>Number of People *</label>
                                            <input type='number' min='1' max='20' required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='Enter number of guests' />
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>Special Requests</label>
                                            <textarea rows='3' className='w-full px-4 py-3 max-h-[100px] rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='Dietary restrictions, celebrations, etc.' />
                                        </div>

                                        <button type='submit' className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'>
                                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                                            </svg>
                                            Confirm Reservation
                                        </button>
                                    </form>
                                </div> :
                                <div className='p-10 md:p-12 bg-white rounded-2xl shadow-lg transition-all hover:shadow-xl max-w-lg mx-auto'>
                                    <h3 className='text-3xl font-extrabold text-gray-900 mb-3 text-center'>
                                        Find Your Reservation
                                    </h3>
                                    <p className='text-gray-600 text-base text-center max-w-sm mx-auto mb-8'>
                                        Enter your registered phone number, email, or booking ID to retrieve your reservation details.
                                    </p>

                                    <div className='space-y-5 flex flex-col'>
                                        {/* Input Field */}
                                        <div className='relative w-full'>
                                            <input
                                                type='text'
                                                className='w-full px-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all peer placeholder-transparent'
                                                placeholder=' '
                                                id='reservationLookup'
                                            />
                                            <label
                                                htmlFor='reservationLookup'
                                                className='absolute left-4 top-4 px-1 text-gray-500 transition-all bg-white 
                                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                                         peer-focus:-top-2 peer-focus:text-sm peer-focus:text-orange-600
                                         peer-focus:px-2 peer-focus:bg-white rounded-md'
                                            >
                                                Phone Number, Email, or Booking ID
                                            </label>
                                        </div>

                                        {/* Search Button */}
                                        <button className='w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2'>
                                            <span>Search Reservations</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className='h-5 w-5'
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Support Info */}
                                    <p className='text-sm text-gray-500 mt-6 text-center'>
                                        Can't find your reservation? <br className='sm:hidden' />
                                        <a href='#' className='text-orange-600 hover:text-orange-700 font-medium underline transition-colors'>
                                            Contact our support team
                                        </a>
                                    </p>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Reservation
