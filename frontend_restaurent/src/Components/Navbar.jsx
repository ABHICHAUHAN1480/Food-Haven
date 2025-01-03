import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@clerk/clerk-react'
const Navbar = ({ cartLength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userprofile, setuserprofile] = useState(false)
  const navigate = useNavigate();

  const navigatetoHome = () => {
    navigate('/');
  }

  const navigatetoCart = () => {
    navigate('/cart');
  }
  const gotoorder = () => {
    navigate('/order');
  }
  return (
<>
    { userprofile ?
       ( 
        <div className = "modal overflow-y-auto top-2 z-20 absolute   w-full h-full left-0 flex items-center  justify-center bg-gray-900 bg-opacity-50">
      < div className = "modal-content" >
        <UserProfile />
        <div className="flex justify-center ">
          <button
            onClick={() => setuserprofile(false)}
            className="bg-red-500 text-white py-2 px-4 rounded my-4 hover:bg-red-700"
          >
            Close Profile
          </button>
        </div>
      </div >
    </div > ) :
(<nav className="bg-gray-800 px-4 py-2 sticky top-0 z-50">

   
  <div className="container mx-auto flex justify-between items-center">

    <div className="text-white text-2xl font-bold">
      MyApp
    </div>

    <ul className=" hidden md:flex space-x-6 items-center ">
      <li className="text-white text-2xl font-bold hover:underline hover:text-gray-300 cursor-pointer" onClick={navigatetoHome}>Home</li>
      <li className="text-white text-2xl font-bold hover:underline hover:text-gray-300 cursor-pointer">Services</li>
      <li className='cursor-pointer' onClick={navigatetoCart}><div style={{ position: 'relative', display: 'inline-block', width: '45px', height: '45px' }}>
        <lord-icon
          src="https://cdn.lordicon.com/pbrgppbb.json"
          trigger="hover"
          colors="primary:#e4e4e4"
          style={{ width: "45px", height: "45px" }}
        ></lord-icon>
        <span
          style={{
            position: 'absolute',
            top: '30%',
            left: cartLength < 10 ? '45%' : '38%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
          }}
          className=" animate-bounce"
        >
          {cartLength}
        </span>
      </div>
      </li>
      <SignedOut>
        <li>

          <SignInButton>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>

        </li></SignedOut>
      <SignedIn>
        <li onClick={gotoorder}   className='cursor-pointer'>
          <lord-icon
            src="https://cdn.lordicon.com/ifsxxxte.json"
            trigger="loop"
            colors="primary:#e4e4e4"
            delay="4000"
            state=""
            style={{ width: "45px", height: "45px" }}>
          </lord-icon>
        </li>
        <li className='ml-0' >

          <UserButton />

        </li>
      </SignedIn>
    </ul>


    <button
      className="text-white md:hidden"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu" >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
        ></path>
      </svg>
    </button>
  </div>

  {isOpen && (
    <ul className="md:hidden bg-gray-800 p-4 space-y-4">
      <li onClick={navigatetoHome} className="text-white hover:underline hover:text-gray-300 cursor-pointer">Home</li>
      <li className="text-white hover:text-gray-300 hover:underline cursor-pointer">Services</li>

      <SignedOut>
        <li>

          <SignInButton>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full">
              Sign In
            </button>
          </SignInButton>

        </li></SignedOut>
      <li onClick={navigatetoCart} className="text-white hover:text-gray-300 hover:underline cursor-pointer">CART ({cartLength})</li>

      <SignedIn>

        <li onClick={() => { setuserprofile(true); setIsOpen(false) }} className="text-white hover:text-gray-300 hover:underline cursor-pointer">
          Your Profile
        </li>
      </SignedIn>
    </ul>

  )}


</nav>)
    
    }
    </>   
  );
};


export default (Navbar);
