import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../Components/Navbar';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const [cartLength, setcartLength] = useState(0);
  // const [timeRemaining, setTimeRemaining] = useState({}); 

  useEffect(() => {
    const fetchOrders = async () => {
       
      try {setLoading(true);
        const token = await getToken();
        const response = await fetch(`${URL}/order/orderitems`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data.data);
          setcartLength(data.length);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const updateTimeRemaining = () => {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          const deliveryEta = new Date(order.delivery_eta).getTime();
          const currentTime = Date.now();
          const differenceMs = deliveryEta - currentTime;

          if (differenceMs <= 0) {
            return { ...order, status: 'Delivered' };
          }
         

          const minutes = Math.floor(differenceMs / 60000);
          const seconds = Math.floor((differenceMs % 60000) / 1000);

          return {
            ...order,
            timeRemaining: { minutes, seconds },
          };
        });
      });
    };

    const intervalId = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [orders]);

  

  return (
    <>
      <Navbar cartLength={cartLength} />
     
      <div className="text-gray-900 p-8 bg-orange-50 min-h-screen">
      {loading && (
      <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
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
  <h2 className="text-4xl font-bold mb-6 text-orange-600">Pending Orders</h2>

  {orders.filter(order => order.status === "Pending").length === 0 ? (
    <p className="text-lg text-gray-500">No pending orders at the moment.</p>
  ) : (
    orders
      .filter(order => order.status === "Pending")
      .map(order => {
        const { minutes, seconds } = order.timeRemaining || { minutes: 0, seconds: 0 };

        return (
          <div
            className="bg-orange-100   relative p-6 rounded-lg shadow-lg mb-6 border border-orange-200"
            key={order.order_id}
          >
            <span className="absolute right-0 m-2 px-4 py-2 rounded-2xl bg-orange-700 text-orange-100 shadow-sm flex items-center space-x-2">
              <span className="text-lg font-bold">ETA:</span>
              <span className="text-lg font-medium">
                {minutes}.{seconds}
              </span>
            </span>

            <h3 className="text-2xl font-semibold text-orange-600 mb-2">
              Order ID: {order.order_id}
            </h3>
            <p className="text-gray-600 mb-4">
              Order Placed At:{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(order.order_at))}
            </p>
            <h4 className="text-xl font-medium text-orange-500 mb-4">Cart Items:</h4>
            <div className="space-y-4">
              <div className="flex justify-between font-bold text-orange-600 text-sm border-b border-orange-300 pb-2">
                <p className="flex-1 text-lg">Product</p>
                <p className="flex-1 text-center text-lg">Quantity</p>
                <p className="flex-1 text-right text-lg">Price</p>
              </div>

              {order.cart.map(item => (
                <div
                  className="flex justify-between items-center text-sm text-gray-700 border-b border-orange-200 py-2"
                  key={item.product_id}
                >
                  <p className="flex-1 font-bold">{item.product}</p>
                  <p className="flex-1 text-center">{item.quantity}</p>
                  <p className="flex-1 text-right">₹{item.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-gray-700">
              <p className="font-medium">Total Price: ₹{order.cart_value}</p>
              <p>Total Quantity: {order.cart.reduce((total, item) => total + item.quantity, 0)}</p>
              <p>Subtotal (with tax): ₹{(order.cart_value * 1.05).toFixed(2)}</p>
            </div>
          </div>
        );
      })
  )}

  <h2 className="text-4xl font-bold mt-10 mb-6 text-green-600"> Order History</h2>

  {orders.filter(order => order.status === "Delivered").length === 0 ? (
    <p className="text-lg text-gray-500">No delivered orders at the moment.</p>
  ) : (
    orders
      .filter(order => order.status === "Delivered")
      .map(order => (
        <div
          className="bg-green-50 p-6 rounded-lg shadow-lg mb-6 border border-green-200"
          key={order.order_id}
        >
          <h3 className="text-2xl font-semibold text-green-600 mb-2">
            Order ID: {order.order_id}
          </h3>
          <p className="text-gray-600 mb-4">
            Order Placed At:{" "}
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(order.order_at))}
          </p>
          <h4 className="text-xl font-medium text-green-500 mb-4">Cart Items:</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-green-600 text-sm border-b border-green-300 pb-2">
              <p className="flex-1 text-lg">Product</p>
              <p className="flex-1 text-center text-lg">Quantity</p>
              <p className="flex-1 text-right text-lg">Price</p>
            </div>

            {order.cart.map(item => (
              <div
                className="flex justify-between items-center text-sm text-gray-700 border-b border-green-200 py-2"
                key={item.product_id}
              >
                <p className="flex-1 font-bold">{item.product}</p>
                <p className="flex-1 text-center">{item.quantity}</p>
                <p className="flex-1 text-right">₹{item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-gray-700">
            <p className="font-medium">Total Price: ₹{order.cart_value}</p>
            <p>Total Quantity: {order.cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p>Subtotal (with tax): ₹{(order.cart_value * 1.05).toFixed(2)}</p>
          </div>
        </div>
      ))
  )}
</div>

    </>
  );
};

export default Order;
