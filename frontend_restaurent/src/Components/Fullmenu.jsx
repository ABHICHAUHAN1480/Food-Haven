import React, { useState, useEffect } from 'react'
import Menu from './Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@clerk/clerk-react';


const Fullmenu = ({setcartLength}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setloading] = useState("false");
  const [cartItems, setcartItems] = useState([]);
  const { getToken } = useAuth();
  
  const URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    
  
    fetchCart(); 
  }, []);
  
      useEffect(() => {
       setcartLength(cartItems.length);    
        }, [cartItems])

  const menu_category = [
    { query: "Breakfast", number: 8 },
    { query: "Lunch", number: 8 },
    { query: "Dinner", number: 8 }
  ];

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  const fetchCart = async () => {
    setloading(true);
    try {
      const token = await getToken();

      const response = await fetch(`${URL}/cart/cartitems`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setcartItems(data.cart);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error('Error adding item to cart:', error);
    }
  };


  return (
    <div className='relative'>
      <ToastContainer
        autoClose={3000}
        theme="dark"
      />

      {menu_category.map((item) => (
        <div key={item.query} id={`${item.query}`} className="">
          <div className='flex flex-col items-center'>
            <h1 className=' text-6xl font-bold'>{item.query}</h1>
            <Menu toast={toast} query={item.query} number={item.number} cartItems={cartItems}  setcartLength={setcartLength}  />

          </div>

        </div>
      ))}

      {/* <div className=" bottom-20 left-1/2 flex flex-col gap-4 transform -translate-x-1/2 ">


        {showCategories && (
          <div
            className="mt-2 w-48 bg-white shadow-lg rounded-lg p-2 transition-all duration-300 transform opacity-100"
            style={{ transition: 'opacity 0.3s ease' }}
          >
            <ul className="space-y-2 p-2">
              {menu_category.map((category) => (
                <li key={category.query}>
                  <a
                    href={`#${category.query}`}
                    className="text-black hover:text-blue-600 font-semibold transition-all duration-200 px-4 py-2 rounded-lg block"
                    onClick={toggleCategories}
                    role="menuitem"
                    aria-label={`Go to ${category.query} category`}
                  >
                    {category.query}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}


        <button
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg opacity-75 hover:opacity-100  hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={toggleCategories}
          aria-expanded={showCategories}
          aria-controls="category-dropdown"
        >
          Menu
        </button>
      </div> */}


    </div>
  )
}


export default (Fullmenu);
