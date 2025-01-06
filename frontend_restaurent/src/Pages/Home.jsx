import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../Components/Navbar';
import Fullmenu from '../Components/Fullmenu';
import Footer from '../Components/Footer';
import location1 from '../assets/location.svg';
import navigation from '../assets/navigation-.svg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const { getToken } = useAuth();

  const [cartLength, setcartLength] = useState(null)
  const [location, setLocation] = useState("");
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(true);
  const [showlocation, setshowlocation] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shownolocation, setshownolocation] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Indore", "Coimbatore", "Nagpur"];
  const visibleCities = showAll ? cities : cities.slice(0, 7);
  useEffect(() => {

    window.scrollTo({ top: 0 });
    cartlen();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setshowsearch(false);
    }, 3500);
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const cartlen = async () => {
    try {
      const token = await getToken();


      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await fetch(`${URL}/home2/cartlen`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const { success, data } = await response.json();

      if (success) {
        setcartLength(data || 0);
      } else {
        console.error('Error fetching cart length:', data);
      }
    } catch (error) {
      console.error('Error fetching cart length:', error.message);
      
    }
  };

  const gotomenu = () => {
    navigate('/menu');
  }

  const showblockedlocation =async()=>{
    setshownolocation(true);
    setshowlocation(false)
    setTimeout(() => {
      setshownolocation(false);
    }, 5000);
  }



  return (<>
    <div className="cursor-default ">
      <Navbar cartLength={cartLength} />
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-6 text-center md:text-left">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the Food Heaven
          </h1>

          <p className="text-lg md:text-xl mb-6">
            Enjoy the finest dishes prepared with love and care.
          </p>
          <span>
            <div className="flex flex-wrap gap-4 justify-center p-4">
              <div className="bg-white w-full max-w-md p-3 flex gap-2 items-center rounded-lg shadow-md transition-transform transform hover:scale-105">

                <img src={location1} alt="Location Icon" className="w-6 h-6" />

                <textarea
                  className="w-full h-10 p-2 resize-none bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Enter your location"
                ></textarea>

                {location && (
                  <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => setLocation("")}
                    aria-label="Clear location"
                  >
                    Clear
                  </button>
                )}
                <span onClick={() => { setshowlocation((prev) => !prev); }} className='cursor-pointer'><lord-icon
                  src="https://cdn.lordicon.com/rmkahxvq.json"
                  trigger="click"
                  style={{ width: "35px", height: "35px" }}>
                </lord-icon></span>
              </div>

              {showlocation && (
                <div className="absolute flex justify-between w-full   mt-20  lg:w-[56rem]  lg:max-w-full  max-w-md   p-3 bg-white rounded-md shadow-md z-10">
                  <div onClick={showblockedlocation} className="text-[#e16614] flex gap-4 font-extrabold text-lg items-center py-3" >
                    <img src={navigation} alt="navigation"  />
                    <p className='cursor-pointer'>Use my current location </p>
                  </div>
                  <button  className="text-blue-500 hover:text-blue-700 font-bold" 
                    onClick={() => setshowlocation(false)}
                  >
                    Close
                  </button>

                </div>

              )}
              {
                shownolocation &&(
                  <div className="absolute flex justify-between w-full bg-red-600 bg-opacity-70   mt-20  lg:w-[56rem]  lg:max-w-full  max-w-md   p-3  rounded-md shadow-md z-10">
                  <div className="text-[#fcfbfa] flex gap-4 font-bold text-sm items-center py-3" >
                 
                    <p className='cursor-pointer'>You have blocked Food Heaven from tracking your location. To use this, change your location settings in browser. </p>
                  </div>
              
                </div>

                )
              }

              <div onClick={gotomenu} className="bg-white w-full max-w-md p-3 flex gap-2 items-center rounded-lg shadow-md transition-transform transform hover:scale-105 relative">

                <lord-icon
                  src="https://cdn.lordicon.com/fkdzyfle.json"
                  trigger="loop"
                  delay="3500"
                  state="in-search"
                  colors="primary:#545454"
                  style={{ width: "35px", height: "35px" }}
                ></lord-icon>

                {showsearch && (
                  <span className="absolute">
                    <lord-icon
                      src="https://cdn.lordicon.com/fkdzyfle.json"
                      trigger="in"
                      delay="35"
                      state="in-search"
                      colors="primary:#545454"
                      style={{ width: "30px", height: "30px" }}
                    ></lord-icon>
                  </span>
                )}


                <textarea
                  className="w-full h-10 p-2 resize-none bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                  placeholder="Search for your favorite dish"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  aria-label="Search for your favorite dish"
                ></textarea>


                {search && (
                  <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => setsearch("")}
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

          </span>



          <div className="mt-6">
            <button onClick={gotomenu} className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow-lg hover:bg-gray-100 transition">
              View Menu
            </button>
            <button className="ml-4 bg-orange-700 text-white font-semibold py-2 px-6 rounded shadow-lg hover:bg-indigo-800 transition">
              Order Now
            </button>
          </div>
        </div>
      </div>



      <div className="container mx-auto mt-20 py-10 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Featured Dishes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full sm:w-[95%] lg:w-[80%] mx-auto gap-6">

          <div className="bg-white  rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src="https://i.ibb.co/XSTBLK5/kaju-katli.webp"
              alt="Kaju katli"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Kaju katli</h3>
              <p className="text-gray-600 mt-2">
                A delicious blend of flavors and spices that will tantalize your
                taste buds.
              </p>
              <button onClick={gotomenu} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Order Now
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src="https://i.ibb.co/rkMDdKR/JPEG-image.jpg"
              alt="Dal Makhani"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Dal Makhani</h3>
              <p className="text-gray-600 mt-2">
                Fresh ingredients and authentic recipes, served with a touch of
                love.
              </p>
              <button onClick={gotomenu} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Order Now
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src="https://i.ibb.co/pzCB7gg/JPEG-image.jpg"
              alt="Cold coffee"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Cold coffee</h3>
              <p className="text-gray-600 mt-2">
                A fusion of culinary excellence and top-quality ingredients.
              </p>
              <button onClick={gotomenu} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className='bg-gradient-to-r mt-7 md:mt-20 from-orange-500 to-orange-600 text-white py-16 px-6 text-center'>
        <div
          ref={sectionRef} className={`container mx-auto transition-opacity duration-1000 ease-in-out ${isVisible ? 'fadein' : 'opacity-0'}`} >

          <h2 className='text-4xl font-extrabold mb-6'>
            Ready to Experience the Best Food?
          </h2>
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isVisible ? 'slideup' : 'opacity-0'}`}>
            Reserve your table today or place an online order to enjoy our special dishes from the comfort of your home.
          </p>

          <div className='flex flex-wrap justify-center gap-4'>
            <button className='bg-white text-orange-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform'>
              Reserve Now
            </button>
            <button onClick={gotomenu} className='bg-indigo-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg  hover:scale-105 bounceslow hover:animate-none transition-transform'>
              Order Online
            </button>
          </div>
        </div>  
      </div>


      <div className="mt-28 mx-4 md:mx-36 py-8 px-4 md:px-6 rounded-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Cities of Our Outlet
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Discover our outlets across various cities. Order food online or enjoy dining-in!
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {visibleCities.map((city, index) => (
            <div
              key={index}
              className="bg-white p-6 w-full max-w-[220px] border border-gray-200 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <p className="text-gray-700 font-medium">
                Order food online or Dine-in
              </p>
              <h3 className="text-lg font-semibold text-orange-600 mt-2">
                {city}
              </h3>
            </div>
          ))}

          {!showAll && cities.length > 7 && (
            <button
              onClick={() => setShowAll(true)}
              className="bg-orange-200 p-6 w-full max-w-[220px] border border-orange-200 rounded-lg shadow-md text-center text-orange-600 font-semibold hover:bg-orange-300 transition-transform transform hover:scale-105"
            >
              Show More...
            </button>
          )}
        </div>
      </div>


    </div>

    <Footer />
  </>

  );
};

export default Home;
