import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
   const { getToken } = useAuth();
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
         const token=await getToken();
        const response = await fetch(`${URL}/order/orderitems`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }); 

     const data = await response.json();
   
        if (response.ok) {
          setOrders(data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-white'>
      <h2>Pending Orders</h2>
      <ul>
        {orders.filter(order => order.status === 'pending').map(order => (
          <li key={order.order_id}>
            <h3>Order ID: {order.order_id}</h3>
            <p>Cart Items: {order.cart.map(item => item.product).join(', ')}</p>
            <p>Price: ${order.cart_value}</p>
            <p>Quantity: {order.cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p>Subtotal: ${(order.cart_value * 1.05).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <h2>Delivery Orders</h2>
      <ul>
        {orders.filter(order => order.status === 'delivered').map(order => (
          <li key={order.order_id}>
            <h3>Order ID: {order.order_id}</h3>
            <p>Cart Items: {order.cart.map(item => item.product).join(', ')}</p>
            <p>Price: ${order.cart_value}</p>
            <p>Quantity: {order.cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p>Subtotal: ${(order.cart_value * 1.05).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
