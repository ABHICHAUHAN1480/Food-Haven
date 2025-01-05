const express = require('express');
const router = express.Router();
const User = require('../modules/User');



router.get('/cartlen', async (req, res) => {
    try {
      const userId = req.auth?.userId;
      
      
      if (!userId) {
        return res.status(400).json({ success: false, message: 'No signed-in user' });
      }
  
      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const cartLength = user.cart.length || 0;
  
      return res.status(200).json({ success: true, data: cartLength });
    } catch (error) {
      console.error('Error getting cart length:', error.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

module.exports = router;