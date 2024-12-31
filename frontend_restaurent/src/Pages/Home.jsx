import React, { useEffect, useState } from 'react';
import { SignInButton, SignOutButton, SignedIn, SignedOut,useUser,useAuth, UserProfile } from '@clerk/clerk-react';
import Navbar from '../Components/Navbar';

import Fullmenu from '../Components/Fullmenu';
import Footer from '../Components/Footer';


const Home = () => {
  const [userprofile, setuserprofile] = useState(false);
  const{ user }= useUser();
  const [cartLength, setcartLength] = useState(null)

 useEffect(() => {
  
  window.scrollTo({ top: 0 });
   
 }, [])
 

  return (<>
 
    {userprofile ? (
             <div className="modal  w-full h-full top-0 left-0 flex items-center  justify-center bg-gray-900 bg-opacity-50">
             <div className="modal-content">
               <UserProfile />
               <div className="flex justify-center">
                 <button
                   onClick={() => setuserprofile(false)}
                   className="bg-red-500 text-white py-2 px-4 rounded my-4 hover:bg-red-700"
                 >
                   Close Profile
                 </button>
               </div>
             </div>
           </div>
          ):<div className="cursor-default">
          <Navbar setuserprofile={setuserprofile} cartLength={cartLength} />

           <h1 className='text-2xl text-center'>Welcome to the restaurant</h1>
           <p  >User: {user?.firstName} {user?.lastName}</p>
         
           
        <Fullmenu  setcartLength={setcartLength} />
        
         </div>
         
         
         }
         <Footer/>  
   </>
  );
};

export default Home;
