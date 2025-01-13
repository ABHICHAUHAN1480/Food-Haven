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
      try {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar cartLength={cartLength} />
      <div className="text-white p-8 bg-gray-900 min-h-screen">
        <h2 className="text-4xl font-bold mb-6">Pending Orders</h2>

        {orders.filter(order => order.status === 'Pending').length === 0 ? (
          <p className="text-lg text-gray-400">No pending orders at the moment.</p>
        ) : (
          orders
            .filter(order => order.status === 'Pending')
            .map(order => {
              const { minutes, seconds } = order.timeRemaining || { minutes: 0, seconds: 0 };

              return (
                <div
                  className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-700"
                  key={order.order_id}
                >
                  <h3 className="text-2xl font-semibold text-orange-400 mb-2">
                    Order ID: {order.order_id}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Order Placed At: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.order_at))}
                  </p>
                  <h4 className="text-xl font-medium text-gray-300 mb-4">Cart Items:</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-100 font-bold text-sm border-b border-gray-700 pb-2">
                      <p className="flex-1 text-lg">Product</p>
                      <p className="flex-1 text-center text-lg">Quantity</p>
                      <p className="flex-1 text-right text-lg">Price</p>
                    </div>

                    {order.cart.map(item => (
                      <div
                        className="flex justify-between items-center text-sm text-gray-300 border-b border-gray-700 py-2"
                        key={item.product_id}
                      >
                        <p className="flex-1">{item.product}</p>
                        <p className="flex-1 text-center">{item.quantity}</p>
                        <p className="flex-1 text-right">₹{item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-gray-300">
                    <p className="font-medium">Total Price: ₹{order.cart_value}</p>
                    <p>Total Quantity: {order.cart.reduce((total, item) => total + item.quantity, 0)}</p>
                    <p>Subtotal (with tax): ₹{(order.cart_value * 1.05).toFixed(2)}</p>
                    <p>Delivery ETA is in {minutes} minutes {seconds} seconds.</p> {/* Displaying the ETA */}
                  </div>
                </div>
              );
            })
        )}

        <h2 className="text-4xl font-bold mt-10 mb-6">Delivered Orders</h2>

        {orders.filter(order => order.status === 'Delivered').length === 0 ? (
          <p className="text-lg text-gray-400">No delivered orders at the moment.</p>
        ) : (
          orders
            .filter(order => order.status === 'Delivered')
            .map(order => (
              <div
                className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-700"
                key={order.order_id}
              >
                <h3 className="text-2xl font-semibold text-green-400 mb-2">
                  Order ID: {order.order_id}
                </h3>
                <p className="text-gray-400 mb-4">
                  Order Placed At: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.order_at))}
                </p>
                <h4 className="text-xl font-medium text-gray-300 mb-4">Cart Items:</h4>
                <div className="space-y-2">
                  {order.cart.map(item => (
                    <div
                      className="flex justify-between text-sm text-gray-300 border-b border-gray-700 py-2"
                      key={item.product_id}
                    >
                      <p>Product: {item.product}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-gray-300">
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
