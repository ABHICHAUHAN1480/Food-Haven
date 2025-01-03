const express = require('express');
const router = express.Router();
const User = require('../modules/User');

router.get("/orderitems", async (req, res) => {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.status(400).json({ error: 'Error: No signed-in user' });
    }
  
    try {
      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        return res.status(404).json({ error: 'No orders found for this user' });
      }
  
      const { orders ,cart} = user;  
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'No orders found for this user' });
      }
       const length=cart.length;
       
       
      return res.status(200).json({ data: orders ,length: length });
  
    } catch (error) {
      console.error('Error getting order items:', error); 
      return res.status(500).json({ error: 'Error getting order items' });
    }
  });
  module.exports = router;