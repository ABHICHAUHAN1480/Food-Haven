import React, { useEffect, useState } from 'react';
import notfound from '../assets/notfound.jpg';
import { useAuth } from '@clerk/clerk-react';
import debounce from 'lodash.debounce';

const Menu = ({ query, number,toast ,cartItems,setcartLength }) => {
  const [menuitems, setmenuitems] = useState([]);
  const [cartState, setCartState] = useState({});
  const { getToken } = useAuth();
  const [loading, setloading] = useState(false)
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchMenu();
  }, []);
  useEffect(() => { 
    checksameIds(menuitems, cartItems);
  }, [cartItems]);

  // useEffect(() => {
  //   setcartLength((prevLength) => prevLength + cartState.length);
  // }, [cartState])
  

  const fetchExternalData = async (title, id, quantity, price) => {
    const body = {
      cart: [{ product_id: id, product: title, quantity: quantity, price: price }]
    };

    setloading(true); 
    try {
      const token = await getToken();

      const response = await fetch(`${URL}/home/user`, {
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
      toast.success('Item added to cart successfully');
      
      setCartState(prevState => ({
        ...prevState,
        [id]: { quantity }
      }));

    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setloading(false); 
    }
  };

  const handleQuantityChange = debounce(async (id, operation) => {
    const prevState = { ...cartState };
    const currentQuantity = prevState[id]?.quantity || 0;
    let newQuantity;
  
    if (operation === 'increment') {
      newQuantity = currentQuantity + 1;

    } else if (operation === 'decrement') {
      newQuantity = currentQuantity > 0 ? currentQuantity - 1 : 0;
    }
    setcartLength((prevLength) => {
      if (newQuantity === 0 && prevState[id]) {
          return prevLength - 1; 
      } 
      return prevLength; 
  });

    setCartState((prev) => ({
      ...prev,
      [id]: newQuantity === 0 ? undefined : { quantity: newQuantity },
    }));
    try {
      await updateCart(id, operation);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error('Failed to update cart. Reverting changes.');
      setCartState(prevState);

    }
  }, 300);

  const checksameIds = (menuitems, cartItems) => {
    for (const item of menuitems) {
      const cartItem = cartItems.find((cartItem) => cartItem.product_id === item.id);
      if (cartItem) {
        setCartState(prev => ({
          ...prev,
          [item.id]: { quantity: cartItem.quantity },
        }));
      }
    }
  };
  const fetchMenu = async () => {
    setloading(true); 
    try {
      const response = await fetch(`${URL}/menu/setmenu?query=${query}&number=${number}`);
      const data = await response.json();

      if (data.success) {
        setmenuitems(data.data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      alert('Failed to fetch menu');
    } finally {
      setloading(false); 
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
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      alert('Failed to update cart');
    } finally {
      setloading(false);
    }
  };

  return (<>
  
    <div className='sm:flex sm:flex-wrap justify-center'>
    
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
      {menuitems.length === 0 && <p>No menu items found.</p>}
      {menuitems.map((item) => (
        <div key={item.id} className="menu-item card shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 m-4 p-4 flex flex-col items-center justify-between rounded-lg border border-gray-200 w-full  md:w-5/12 lg:w-3/12">
          <img
            src={item.image || notfound}
            alt="food img"
            className="menu-item-image rounded-lg w-[150px] h-[100px] object-cover mb-4"
            onError={(e) => { e.target.src = notfound; }}
          />
          <div className="menu-item-content text-center">
            <h2 className="text-xl text-orange-800 font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-3">
              Serving: {item.servings.number} {item.servings.size} {item.servings.unit}
            </p>
            <span className='flex items-center align-middle gap-7 '>
              <span className="text-lg font-bold text-green-600 ">
                ${item.price}
              </span>
              {!cartState[item.id] ? (
                <button
                  className="add-to-cart-btn bg-orange-500 text-white py-2  px-4 rounded-full  hover:bg-orange-600 transition-all duration-300"
                  onClick={() => {
                    setCartState(prevState => ({
                      ...prevState,
                      [item.id]: { quantity: 1 }
                    }));
                    setcartLength((prevLength) => prevLength + 1);
                    fetchExternalData(item.title, item.id, 1 ,item.price);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="quantity-control flex items-center w-36">
                  <button
                    className="decrement-btn bg-gray-300 text-gray-700 py-2  px-4 rounded-l-full hover:bg-gray-400 transition-all duration-300"
                    onClick={() => handleQuantityChange(item.id, 'decrement')}
                  >
                    -
                  </button>
                  <span className="quantity-number mx-2 text-lg font-semibold">{cartState[item.id]?.quantity}</span>
                  <button
                    className="increment-btn bg-gray-300 text-gray-700 py-2 px-4 rounded-r-full hover:bg-gray-400 transition-all duration-300"
                    onClick={() => handleQuantityChange(item.id, 'increment')}
                  >
                    +
                  </button>
                </div>
              )}

            </span>

          </div>
        </div>
      ))}
    </div></>
  );
};

export default Menu;
