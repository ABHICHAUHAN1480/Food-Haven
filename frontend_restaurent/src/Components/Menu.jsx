import React, { useEffect, useState } from 'react';
import notfound from '../assets/notfound.jpg';
import { useAuth } from '@clerk/clerk-react';
import debounce from 'lodash.debounce';
import vegicon from '../assets/vegicon.svg';
import nonvegicon from '../assets/nonvegicon.svg';
const Menu = ({ categoryName,items,toast ,cartItems,setcartLength }) => {
  const [menuitems, setmenuitems] = useState([]);
  const [cartState, setCartState] = useState({});
  const { getToken } = useAuth();
  const [loading, setloading] = useState(false)
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // fetchMenu();
    setmenuitems(items);
  }, []);
  useEffect(() => { 
    checksameIds(menuitems, cartItems);
  }, [cartItems,menuitems]);

  // useEffect(() => {
  //   setcartLength((prevLength) => prevLength + cartState.length);
  // }, [cartState])
  

  const fetchExternalData = async (title, id, quantity, price,diet) => {
    const body = {
      cart: [{ product_id: id, product: title, quantity: quantity, price: price ,diet:diet }]
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

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen px-4 sm:px-8">
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
      <h1 id={`${categoryName}`}  className="text-5xl font-extrabold text-center text-gray-800 border-b-4 border-gray-700  my-10">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h1>
      {menuitems.length === 0 && <p className="text-lg text-gray-600">No menu items found.</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl mx-auto">
        {menuitems.map((item) => (
          <div
            key={item.id}
            id={`${item.title}`}
            className="relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col items-center text-center border border-gray-200"
          >
            <img
              src={item.image_url || notfound}
              alt="food img"
              className="w-40 h-28 rounded-lg object-cover mb-4 shadow-sm"
              onError={(e) => {
                e.target.src = notfound;
              }}
            />
            <div className="absolute top-4 left-4">
              {item.diet === 'vegetarian' ? (
                <img src={vegicon} alt="veg icon" className="w-7 h-7" />
              ) : (
                <img src={nonvegicon} alt="non-veg icon" className="w-7 h-7" />
              )}
            </div>
            <h2   className="text-lg font-bold text-gray-900 mb-1">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-3">
              Serving: {item.servings.number} {item.servings.size} {item.servings.unit}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-yellow-500 text-lg flex items-center">
                {'★'.repeat(Math.floor(item.rating))}
                {'☆'.repeat(5 - Math.floor(item.rating))}
              </span>
              <span className="text-sm text-gray-500">({item.rating.toFixed(1)})</span>
            </div>
            <div className="flex justify-between items-center w-full mt-auto">
              <span className="text-xl font-bold text-green-600">₹{item.price}</span>
              {!cartState[item.id] ? (
                <button
                  className="bg-orange-500 text-white py-2 px-5 rounded-full hover:bg-orange-600 transition-all duration-300"
                  onClick={() => {
                    setCartState((prevState) => ({
                      ...prevState,
                      [item.id]: { quantity: 1 },
                    }));
                    setcartLength((prevLength) => prevLength + 1);
                    fetchExternalData(item.title, item.id, 1, item.price,item.diet);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-3 rounded-l-full hover:bg-gray-400 transition-all duration-300"
                    onClick={() => handleQuantityChange(item.id, 'decrement')}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-gray-900">
                    {cartState[item.id]?.quantity}
                  </span>
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-3 rounded-r-full hover:bg-gray-400 transition-all duration-300"
                    onClick={() => handleQuantityChange(item.id, 'increment')}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  
  
  );
};

export default Menu;
