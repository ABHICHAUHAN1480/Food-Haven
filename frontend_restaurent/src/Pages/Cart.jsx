import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import vegicon from '../assets/vegicon.svg';
import nonvegicon from '../assets/nonvegicon.svg';
import Confetti from 'react-confetti';

const Cart = () => {
  const { getToken } = useAuth();
  const [cartItems, setcartItems] = useState([]);
  const [loading, setloading] = useState(false);
  const [address, setaddress] = useState([]);
  const [isaddress, setisaddress] = useState(true);
  const [isplaced, setisplaced] = useState(false);
  const [eta, seteta] = useState("");
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  useEffect(() => {
    fetchcart();
    window.scrollTo({ top: 0 });
    checkaddress();

  }, [])

  useEffect(() => {

    if (!isaddress) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }


    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isaddress]);


  useEffect(() => {
    let timeoutId;

    if (isplaced) {
      document.body.style.overflow = "hidden";

      timeoutId = setTimeout(() => {
        setisplaced(false);
        document.body.style.overflow = "auto";
        navigate('/order');
      }, 6500);
    }


    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = "auto";
    };
  }, [isplaced]);

  const navigatetoHome = () => {
    navigate('/');
  }

  const fetchcart = async () => {
    setloading(true);
    try {
      const token = await getToken();

      const response = await fetch(`${URL}/cart/cartitems`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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
  }

  const updateCart = async (productId, operation) => {
    const body = { productId, operation };
    setloading(true);
    try {
      const token = await getToken();
      const response = await fetch(`${URL}/home/quantity`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      fetchcart();
      setloading(false);

    } catch (error) {
      console.error('Error updating cart quantity:', error);
      setloading(false);
    }
  }

  const order = async (cartvalue) => {
    const orderid = uuidv4();
    const token = await getToken();
    const addressname = address[0].addressname;


    try {
      const response = await fetch(`${URL}/cart/order`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderid: orderid,
          cartvalue: cartvalue,
          addressname: addressname,
        }),
      });


      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        const differenceMs = Date.now() - new Date(data.delivery_eta).getTime();
        seteta(`Delivery ETA is in ${Math.abs(Math.floor(differenceMs / 60000))} minutes.`);


        setisplaced(true);
      } else {
        toast.error('Error placing order');
      }
    } catch (error) {
      console.error('Error with the order:', error);
      toast.error('An error occurred while placing the order');
    }
  };

  const checkaddress = async () => {
    const token = await getToken();
    try {
      const response = await fetch(`${URL}/home2/getaddress`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        if (!data.data || Object.keys(data.data).length === 0) {
          setisaddress(false);
          return;
        } else {
          setaddress(data.data);
          setisaddress(true);
          return;
        }
      } else {
        toast.error('Error fetching address');
        return "error";
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error('An error occurred while fetching address');
      return "error";
    }
  };

  const addAddress = async (street, city, state, zip, addressname) => {
    const token = await getToken();
    try {
      const response = await fetch(`${URL}/home2/address`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ street, city, state, zip, addressname }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setisaddress(true);
      } else {
        toast.error('Error adding address');
      }
    }
    catch (error) {
      console.error('Error adding address:', error);
      toast.error('An error occurred while adding address');
    }
  }

  return (
    <>
      {!isaddress && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="address-form bg-white p-8 rounded-2xl shadow-2xl w-full md:w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto transform transition-transform scale-100 md:scale-105">
            <h3 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
              Add Address
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const street = e.target.street.value;
                const city = e.target.city.value;
                const state = e.target.state.value;
                const zip = e.target.zip.value;
                const addressname = e.target.addressname.value;
                addAddress(street, city, state, zip, addressname);
              }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="addressname"
                    className="text-lg font-semibold text-gray-700 mb-2"
                  >
                    Address Name
                  </label>
                  <input
                    type="text"
                    id="addressname"
                    name="addressname"
                    className="text-lg font-medium text-gray-800 p-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                    placeholder="e.g., Home, Office"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="street"
                    className="text-lg font-semibold text-gray-700 mb-2"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className="text-lg font-medium text-gray-800 p-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                    placeholder="e.g., 123 Main St"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="city"
                    className="text-lg font-semibold text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="text-lg font-medium text-gray-800 p-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                    placeholder="e.g., New York"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="state"
                    className="text-lg font-semibold text-gray-700 mb-2"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="text-lg font-medium text-gray-800 p-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                    placeholder="e.g., NY"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="zip"
                    className="text-lg font-semibold text-gray-700 mb-2"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="text-lg font-medium text-gray-800 p-3 border border-gray-300 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                    placeholder="e.g., 10001"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="add-address mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-400 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-transform transform hover:scale-105"
              >
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}

      {isplaced && (
        <div className={`fixed inset-0 bg-black bg-opacity-60 z-30 flex flex-col gap-2 justify-center items-center transition-opacity duration-300 ease-in-out    }`}>
          <Confetti
            numberOfPieces={600}

            gravity={0.3}
            wind={0.01}
            recycle={false}
            initialVelocityX={5}
            initialVelocityY={10}
          />
          <div className="relative flex items-center border-2 border-gray-300 p-3 rounded-lg bg-green-700 px-5">

            <span className='z-10'> <lord-icon
              src="https://cdn.lordicon.com/cfzswyna.json"
              trigger="in"
              delay="1500"
              stroke="light"
              state="in-reveal"
              colors="primary:#545454,secondary:#b4b4b4,tertiary:#30e849"
              style={{ width: "125px", height: "125px" }}
            ></lord-icon></span>

            <span className="font-extrabold text-3xl text-white ml-4 z-10">
              Your order is placed
            </span>


            {[
              { top: "14%", left: "5%" },
              { top: "86%", left: "8%" },
              { top: "14%", left: "25%" },
              { top: "23%", left: "90%" },
              { top: "25%", left: "70%" },
              { top: "80%", left: "40%" },
              { top: "29%", left: "45%" },
              { top: "80%", left: "80%" },
            ].map((position, index) => (
              <span
                key={index}
                className="absolute"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/lxizbtuq.json"
                  trigger="loop"
                  stroke="light"

                  colors="primary:#c79816,secondary:#e8b730,tertiary:#e8b730"
                  style={{ width: "35px", height: "35px" }}
                ></lord-icon>
              </span>
            ))}
          </div>
          <p>{`${eta}`}</p>
        </div>
      )}


      <div className='bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 '>
        <ToastContainer autoClose={3000} theme="dark" />
        <Navbar cartLength={cartItems.length} />
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
        <div className="container mx-auto p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 rounded-lg shadow-lg w-full my-4">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 border-b-4 border-gray-400 pb-4">Your Cart</h2>
          <div className="flex flex-col lg:flex-row gap-10 border-b-4 border-gray-400 pb-7 md:pb-14">
            <div className="cart-items max-h-[60vh] overflow-y-scroll hide-scrollbar flex-1 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  
                  className="cart-item flex flex-col max-w-full  max-h-[25vh] justify-between p-4 md:p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  <div className="absolute top-4 right-4">
                    {item.diet === 'vegetarian' ? (
                      <img src={vegicon} alt="veg icon" className="w-7 h-7" />
                    ) : (
                      <img src={nonvegicon} alt="non-veg icon" className="w-7 h-7" />
                    )}
                  </div>
                  <span className="item-name text-lg md:text-xl font-semibold text-gray-900 ">
                    {item.product}
                  </span>
                  <div className="item-quantity flex items-center justify-between mt-4 gap-2">
                    <button
                      className="decrease-quantity bg-red-500 text-white px-5 py-2 md:px-6 md:py-2 rounded-full shadow-md hover:bg-red-600 transition-transform transform hover:scale-110 active:scale-95"
                      onClick={() => updateCart(item.product_id, "decrement")}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span
                      className="quantity text-base md:text-lg font-medium text-gray-900 bg-gray-100 px-4 md:px-6 py-1 md:py-2 rounded-lg shadow-sm text-center w-14"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>
                    <button
                      className="increase-quantity bg-green-500 text-white px-5 py-2 md:px-6 md:py-2 rounded-full shadow-md hover:bg-green-600 transition-transform transform hover:scale-110 active:scale-95"
                      onClick={() => updateCart(item.product_id, "increment")}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="item-price text-lg md:text-xl font-bold text-gray-800 mt-4">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="cart-summary flex-1 max-w-md text-gray-900 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-4">Cart Summary</h3>
              <ul className="divide-y divide-gray-300 mb-6">
                <li className="py-3 flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </li>
                <li className="py-3 flex justify-between md:text-lg">
                  <span>Tax (5%)</span>
                  <span>₹{(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.05).toFixed(2)}</span>
                </li>
                <li className="py-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.05).toFixed(2)}</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button onClick={navigatetoHome} className="continue-shopping bg-gray-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-700 transition w-full sm:w-auto">
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    order(
                      (
                        cartItems.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        ) * 1.05
                      ).toFixed(2)
                    );
                  }}
                  disabled={!isaddress || cartItems.length === 0}  className={`checkout-button px-6 py-3 rounded-lg shadow w-full sm:w-auto ${(isaddress && cartItems.length > 0)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                >
                  Checkout
                </button>
              </div>

            </div>
          </div>
        </div>
        <div className="recommendations mt-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Recommended for You</h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="recommendation-item p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <img src="/images/fries.jpg" alt="Ice Cream" className="w-full h-40 object-cover rounded-md mb-4" />
              <span className="item-name text-lg font-semibold text-gray-900">Ice Cream</span>
              <span className="item-price text-lg font-bold text-gray-800 mt-2 block">₹3.00</span>
              <button className="add-to-cart bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition mt-4 w-full">
                Add to Cart
              </button>
            </div>

            <div className="recommendation-item p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <img src="/images/fries.jpg" alt="Fries" className="w-full h-40 object-cover rounded-md mb-4" />
              <span className="item-name text-lg font-semibold text-gray-900">Fries</span>
              <span className="item-price text-lg font-bold text-gray-800 mt-2 block">₹4.00</span>
              <button className="add-to-cart bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition mt-4 w-full">
                Add to Cart
              </button>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Cart
