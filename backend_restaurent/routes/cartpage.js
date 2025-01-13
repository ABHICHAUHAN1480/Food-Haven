const express = require('express');
const router = express.Router();
const User = require('../modules/User');

router.get('/cartitems', async (req, res) => {
  const userId = req.auth.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Error: No signed-in user' });
  }

  try {

    const user = await User.findOne({ clerkId: userId });


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});

router.post('/order', async (req, res) => {
  const userId = req.auth.userId;
  const { orderid, cartvalue, addressname } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Error: No signed-in user' });
  }

  try {
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const delay = Math.floor(Math.random() * 11 + 20) * 60 * 1000;
    const deliveryEta = new Date(Date.now() + delay);

   
    const newOrder = {
      order_id: orderid,
      cart_value: cartvalue,
      cart: user.cart,
      order_at: new Date(),
      status: 'Pending',
      addressname: addressname,
      delivery_eta: deliveryEta, 
    };

    
    user.orders.push(newOrder);
    user.cart = [];
    await user.save();

    setTimeout(async () => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { 'orders.order_id': orderid },
          { $set: { 'orders.$.status': 'Delivered' } },
          { new: true }
        );
        if (!updatedUser) {
          console.error(`Order with ID ${orderid} not found for user ${userId}`);
        } else {
          console.log(`Order ${orderid} status updated to Delivered`);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }, delay);

    
    return res.status(200).json({ 
      success: true, 
      message: 'Order placed successfully', 
      delivery_eta: deliveryEta 
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ error: 'Error placing order' });
  }
});


module.exports = router;
