import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@clerk/clerk-react'
import logo from '../assets/logi.png';
const Navbar = ({ cartLength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userprofile, setuserprofile] = useState(false)
  const [settinglogo, setsettinglogo] = useState(true);
  const [showsetting, setshowsetting] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setshowsetting(false);
      }
    };
   
    document.addEventListener('click', handleClickOutside);
  
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const toggleSettings = (event) => {
    event.stopPropagation(); 
    setshowsetting((prev) => !prev);
  };
  

  useEffect(() => {
    timeout();
  }, [])
  const timeout=()=>{
    setTimeout(() => {
      setsettinglogo(false);
    }, 4000);
  }
  
  const navigatetoHome = () => {
    navigate('/');
  }

  const navigatetoCart = () => {
    navigate('/cart');
  }
  const gotoorder = () => {
    navigate('/order');
  }
  const gotomenu = () => {
    navigate('/menu');
  }
  return (
<>
    { userprofile ?
       ( 
        <div className = " overflow-y-auto top-2 z-20 fixed   w-full h-full left-0 flex items-center  justify-center bg-gray-900 bg-opacity-50">
      < div className =" " >
        <UserProfile />
        <div className="flex justify-center ">
          <button
        onClick={() => { setuserprofile(false); timeout();setsettinglogo(true); }}
            className="bg-red-500 text-white py-2 px-4 rounded my-4 hover:bg-red-700"
          >
            Close Profile
          </button>
        </div>
      </div >
    </div > ) :
(<nav className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 sticky w-full top-0 z-50">

   
  <div className="container mx-auto flex justify-between items-center">

    <div className="text-white text-4xl flex items-center gap-5 font-bold">
      <img className='h-[55px] ' src={logo} alt=""  />
      Food Haven
    </div>

    <ul className=" hidden md:flex space-x-6 items-center ">
      <li className="text-white text-2xl font-bold hover:underline hover:text-gray-300 cursor-pointer" onClick={navigatetoHome}>Home</li>
      {/* < li onClick={gotomenu} className="text-white text-2xl font-bold hover:underline hover:text-gray-300 cursor-pointer">Menu</li> */}
      {cartLength!=-2 && <li className='cursor-pointer' onClick={navigatetoCart}><div style={{ position: 'relative', display: 'inline-block', width: '45px', height: '45px' }}>
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
      </li>}
      <SignedOut>
        <li>

          <SignInButton>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>

        </li></SignedOut>
      <SignedIn>
        <li
          onClick={toggleSettings}   className='cursor-pointer'>
          <lord-icon
            src="https://cdn.lordicon.com/ifsxxxte.json"
            trigger="loop"
            colors="primary:#e4e4e4"
            delay={`${settinglogo ? '0' : '4000'}`}
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
    <ul className="md:hidden bg-gray-800 p-4 space-y-4 rounded-md">
      <li onClick={navigatetoHome} className="text-white hover:underline hover:text-gray-300 cursor-pointer">Home</li>
      <li onClick={gotomenu} className="text-white hover:text-gray-300 hover:underline cursor-pointer">Menu</li>

      <SignedOut>
        <li>

          <SignInButton>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full">
              Sign In
            </button>
          </SignInButton>

        </li></SignedOut>
       {cartLength!=-2 &&
      <li onClick={navigatetoCart} className="text-white hover:text-gray-300 hover:underline cursor-pointer">CART <SignedIn>({cartLength})</SignedIn></li>}
           
      <SignedIn>
        <li onClick={() => setshowsetting((prev) => !prev)}>Setting</li>
       
      </SignedIn>
    </ul>

  )}


</nav>)
    
    } 
   {showsetting && (
  <div
   ref={modalRef}
   className="top-0 fixed  w-full h-full md:h-auto  md:top-20 md:right-4 z-50 bg-white md:w-[400px] max-h-[700px] text-gray-800 rounded-lg shadow-lg border border-gray-300">
    <span className='md:hidden block absolute top-0 right-0  cursor-pointer' onClick={() => setshowsetting(false)}>
    <lord-icon
    src="https://cdn.lordicon.com/xracfmrw.json"
    trigger="click"
    stroke="bold"
    colors="primary:#848484,secondary:#000000,tertiary:#848484"
    style= {{width: "45px", height: "45px"}}>
</lord-icon>
    </span>
     <div onClick={()=>{ setuserprofile(true); setIsOpen(false);setshowsetting(false)} }  className="flex mt-[55px] md:mt-4 items-center gap-5 m-4 p-2 font-bold text-lg cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-400">
    <lord-icon
    src="https://cdn.lordicon.com/oeyhfinq.json"
    trigger="loop"
    stroke="bold"
    delay="1000"
    colors="primary:#121331,secondary:#242424,tertiary:#545454,quaternary:#b4b4b4"
    style={{ width: "45px", height: "45px" }}>
</lord-icon>
      <span>My Profile</span>
    </div>
    <div onClick={gotoorder} className="flex items-center gap-5 m-4 p-2 font-bold text-lg cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-400">
      <lord-icon
        src="https://cdn.lordicon.com/rqzuamwu.json"
        trigger="loop"
        stroke="bold"
        delay="1000"
        colors="primary:#121331,secondary:#848484"
        style={{ width: "45px", height: "45px" }}
      ></lord-icon>
      <span  >My Orders</span>
    </div>
    <SignOutButton>
    <div  className="flex items-center gap-5 m-4 p-2 font-bold text-lg cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-400">
    <lord-icon
    src="https://cdn.lordicon.com/kzwsxyaq.json"
    trigger="hover"
    stroke="bold"
    colors="primary:#000000,secondary:#242424,tertiary:#545454"
    style={{ width: "45px", height: "45px" }}>
</lord-icon>
      <span>Signed Out</span>
    </div>
    </SignOutButton>
    
  </div>
)}

    </>   
  );
};


export default (Navbar);
