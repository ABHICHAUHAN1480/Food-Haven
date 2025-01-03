import React, { useEffect, useState } from 'react';
import { SignInButton, SignOutButton, SignedIn, SignedOut, useUser, useAuth, UserProfile } from '@clerk/clerk-react';
import Navbar from '../Components/Navbar';
import Fullmenu from '../Components/Fullmenu';
import Footer from '../Components/Footer';
import location1 from '../assets/location.svg';
import navigation from '../assets/navigation-.svg';

const Home = () => {

  const { user } = useUser();
  const [cartLength, setcartLength] = useState(null)
  const [location, setLocation] = useState("");
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(true);
  const [showlocation, setshowlocation] = useState(false);
  useEffect(() => {

    window.scrollTo({ top: 0 });

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setshowsearch(false);
    }, 3500);
  }, [])


  return (<>
    <div className="cursor-default ">
      <Navbar cartLength={cartLength} />
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-6 text-center md:text-left">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the Restaurant
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
              <span onClick={()=>{setshowlocation((prev) => !prev);}} className='cursor-pointer'><lord-icon
    src="https://cdn.lordicon.com/rmkahxvq.json"
    trigger="click"
    style={{width:"35px",height:"35px"}}>
</lord-icon></span>
            </div>
           
        {showlocation  && (
          <div className="absolute flex justify-between   mt-20 -ml-[30vw] w-full max-w-lg p-3 bg-white rounded-md shadow-md z-10">
            <div className="text-[#e16614] flex gap-4 font-extrabold text-lg items-center py-3" >
             <img src={navigation} alt="navigation" srcset="" />
             <p className='cursor-pointer'>Use my current location </p>
            </div>
            <button
              className="text-blue-500 hover:text-blue-700 font-bold"
              onClick={() => setshowlocation(false)} // Hide popup on button click
            >
              Close
            </button>
          </div>
        )}

            <div className="bg-white w-full max-w-md p-3 flex gap-2 items-center rounded-lg shadow-md transition-transform transform hover:scale-105 relative">

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
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow-lg hover:bg-gray-100 transition">
              View Menu
            </button>
            <button className="ml-4 bg-orange-700 text-white font-semibold py-2 px-6 rounded shadow-lg hover:bg-indigo-800 transition">
              Order Now
            </button>
          </div>
        </div>
      </div>


      {/* Featured Section */}
      <div className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">
          Featured Dishes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white  rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/3"
              alt="Dish 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Dish Name</h3>
              <p className="text-gray-600 mt-2">
                A delicious blend of flavors and spices that will tantalize your
                taste buds.
              </p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Order Now
              </button>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/2"
              alt="Dish 2"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Dish Name</h3>
              <p className="text-gray-600 mt-2">
                Fresh ingredients and authentic recipes, served with a touch of
                love.
              </p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Order Now
              </button>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/1"
              alt="Dish 3"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Dish Name</h3>
              <p className="text-gray-600 mt-2">
                A fusion of culinary excellence and top-quality ingredients.
              </p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Fullmenu setcartLength={setcartLength} />
      {/* <div className="bg-orange-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to experience the best food?
        </h2>
        <p className="text-lg mb-6">
          Reserve your table today or place an online order to enjoy our special
          dishes from the comfort of your home.
        </p>
        <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded shadow-lg hover:bg-gray-100 transition">
          Reserve Now
        </button>
        <button className="ml-4 bg-indigo-800 text-white font-semibold py-2 px-6 rounded shadow-lg hover:bg-indigo-900 transition">
          Order Online
        </button>
      </div> */}


    </div>

    <Footer />
  </>

  );
};

export default Home;
