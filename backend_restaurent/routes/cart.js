const express = require('express');
const router = express.Router();
const { clerkClient } = require('@clerk/express');
const User = require('../modules/User');

router.post('/user', async (req, res) => {
  const userId = req.auth.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Error: No signed-in user' });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const { cart: newCartItems } = req.body;
    
    
    if (!Array.isArray(newCartItems)) {
      return res.status(400).json({ error: 'Invalid cart format. Cart must be an array.' });
    }

    
    let user1 = await User.findOne({ clerkId: user.id });

    if (!user1) {
      
      user1 = new User({
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.primaryPhoneNumber.phoneNumber || null,
        cart: newCartItems, 
      });
      await user1.save();
    } else {
      
      newCartItems.forEach((newItem) => {
        const existingItemIndex = user1.cart.findIndex(
          (cartItem) => cartItem.product_id === newItem.product_id
        );

        if (existingItemIndex !== -1) {
          
          user1.cart[existingItemIndex].quantity += newItem.quantity;
        } else {
          user1.cart.push(newItem);
        }
      });
    
      await user1.save();
      
    }
    
    
    return res.status(200).json({ success: true, user: user1 });

  } catch (error) {
    
    return res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});


router.post('/quantity', async (req, res) => {
  const userId = req.auth.userId; 
  
  
  const { productId , operation } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Error: No signed-in user' });
  }
  if (!productId || !['increment', 'decrement'].includes(operation)) {
    return res.status(400).json({ error: 'Invalid request. Missing productId or invalid operation.' });
  }

  try {
    
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
              
    const cartItemIndex = user.cart.findIndex((item) => item.product_id === productId);
   

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
  
    
    const cartItem = user.cart[cartItemIndex];
    
    if (operation === 'increment') {
      cartItem.quantity += 1;
    } else if (operation === 'decrement') {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        
      } else {
        
        user.cart.splice(cartItemIndex, 1);
      }
    }
    await user.save();

    return res.status(200).json({ success: true ,message: 'Cart updated successfully'});
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
});





module.exports = router;
