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
  const { orderid, cartvalue } = req.body;
    
  if (!userId) {
    return res.status(400).json({ error: 'Error: No signed-in user' });
  }


  try {
    
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const newOrder = {
      order_id: orderid,
      cart_value: cartvalue,
      cart: user.cart, 
      order_at: new Date(), 
      status: 'Pending', 
    };
    user.orders.push(newOrder);
    user.cart = []; 
    await user.save();

    return res.status(200).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ error: 'Error placing order' });
  }
});

module.exports = router;
