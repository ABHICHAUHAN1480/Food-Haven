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
const Cart = () => {
  const { getToken } = useAuth();
  const [cartItems, setcartItems] = useState([]);

  const [loading, setloading] = useState(false)
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();
  useEffect(() => {
    fetchcart();
    window.scrollTo({ top: 0 });

  }, [])
  const navigatetoHome = () => {      
    navigate('/');}

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
    const token=await getToken();
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
        }),
      });
  
      
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message); 
        setcartItems([]);
      } else {
        toast.error('Error placing order');
      }
    } catch (error) {
      console.error('Error with the order:', error);
      toast.error('An error occurred while placing the order');
    }
  };
  


  return (
  <div className='bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 '>
     <ToastContainer
            autoClose={3000}
            theme="dark"
          />
    

    <Navbar  cartLength={cartItems.length}/>
    {loading && (
                    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
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
      style={{ maxWidth: "100%" }} 
      className="cart-item flex flex-col justify-between p-4 md:p-6   bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
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
        <button onClick={navigatetoHome}  className="continue-shopping bg-gray-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-700 transition w-full sm:w-auto">
          Continue Shopping
        </button>
        <button onClick={() => order((cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.05).toFixed(2))}
          className="checkout-button bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto">
          Checkout
        </button>
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
</div>






    <Footer/>
  </div>

  )
}

export default Cart
