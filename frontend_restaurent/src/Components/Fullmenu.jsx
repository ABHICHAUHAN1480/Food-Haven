import React, { useState, useEffect } from 'react'
import Menu from './Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@clerk/clerk-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHref } from 'react-router-dom';


const Fullmenu = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setloading] = useState("false");
  const [search, setsearch] = useState("");
  const [cartItems, setcartItems] = useState([]);
  const [cartLength, setcartLength] = useState("")
  const { getToken } = useAuth();
  const [showsearch, setshowsearch] = useState(true)
  const [menu_Category, setmenu_Category] = useState([])
  const [itemarray, setitemarray] = useState([]);
   const [searcharray, setsearcharray] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {

    fetchMenu();
    fetchCart();
    setTimeout(() => {
      setshowsearch(false);
    }, 3500);
  }, []);

  useEffect(() => {
    setcartLength(cartItems.length);
  }, [cartItems])


  const fetchMenu = async () => {
    setloading(true);
    try {
      const response = await fetch(`${URL}/menu/getmenu`);
      const data = await response.json();

      if (data.success) {
         setitemarray(data.data);
       
         
        const categorizedMenu = data.data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});
      
        setmenu_Category(categorizedMenu);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      alert('Failed to fetch menu');
    } finally {
      setloading(false);
    }
  }


  const handleSearch = (searchTerm) => {
    const filtered = itemarray.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setsearcharray(filtered);
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
    <div className="relative bg-gray-100 min-h-screen">

    {/* Loading State */}
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
  
  
    <ToastContainer autoClose={3000} theme="dark" />
  

    <Navbar cartLength={cartLength} />
  
    
    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 py-10">
      <div className="max-w-5xl mx-auto text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Food Haven</h1>
        <p className="text-lg font-medium mb-6">
          Discover a variety of delicious dishes crafted to perfection. Your next meal awaits!
        </p>
        <button className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
          Explore Menu
        </button>
      </div>
    </div>
  
    
    <div className="flex justify-center my-8">
 
  <div className="bg-white w-full max-w-2xl p-4 flex items-center gap-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105 relative">
    <lord-icon
      src="https://cdn.lordicon.com/fkdzyfle.json"
      trigger={showsearch ? "in" : "loop"}
      delay={showsearch ? 0 : 3500}
      state="in-search"
      colors="primary:#545454"
      style={{ width: "40px", height: "40px" }}
    ></lord-icon>

    <textarea
      className="w-full h-12 p-3 resize-none bg-gray-100 text-gray-800 placeholder-gray-500 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search for your favorite dish"
      value={search}
      onChange={(e) => {
        handleSearch(e.target.value);
        setsearch(e.target.value);
      }}
      aria-label="Search for your favorite dish"
    ></textarea>

    {search && (
      <button
        className="text-red-500 hover:text-red-700 font-semibold transition-all duration-200"
        onClick={() => setsearch("")}
        aria-label="Clear search"
      >
        Clear
      </button>
    )}
  </div>
</div>

<div className="mt-6 w-full max-w-2xl  mx-auto ">
  {search ? (
    searcharray.length > 0 ? (
      <div className=" px-4 flex flex-col gap-2 max-h-[50vh] overflow-y-auto hide-scrollbar">
        {searcharray.map((item, id) => (
          <div
            key={id}
            onClick={() => {
              setsearch("");
              const targetElement = document.getElementById(`${item.title}`);
              if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top ;
                const offsetPosition = elementPosition - (window.innerHeight ) + (targetElement.offsetHeight / 2); 
            
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
            
            className="bg-white cursor-pointer text-gray-800 flex gap-4 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200"
          >
            <img className='w-[60px] h-[60px]' src={item.image_url} alt="image" />
            <span className='flex flex-col'>
            <h3 className="text-lg font-semibold ">{item.title}</h3>
            <h3 className='text-yellow-500'>{item.rating}★</h3>
            </span>
            
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center mt-8">
        <lord-icon
          src="https://cdn.lordicon.com/msoeawqm.json"
          trigger="loop"
          colors="primary:#c4c4c4,secondary:#000000"
          style={{ width: 50, height: 50 }}
        ></lord-icon>
        <p className="text-gray-500 italic mt-4">No results found</p>
      </div>
    )
  ) : (
    <p className="text-center text-gray-500 italic mt-4">
      Start typing to see search results.
    </p>
  )}
</div>


    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Explore Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.keys(menu_Category).map((category) => (
          <div
            key={category}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
          >
            <h3 className="text-xl font-semibold text-orange-600">{category}</h3>
            <p className="text-gray-600 mt-2">Discover the best dishes in {category}.</p>
            <button
            onClick={() => {
              const targetElement = document.getElementById(`${category}`);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-all duration-300"
            >
              View Menu
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="my-8">
      {Object.keys(menu_Category).map((category) => (
        <Menu
          key={category}
          categoryName={category}
          items={menu_Category[category]}
          toast={toast}
          cartItems={cartItems}
          setcartLength={setcartLength}
        />
      ))}
    </div>
  
    <Footer />
  
  </div>
  
  
  )
}


export default (Fullmenu);
