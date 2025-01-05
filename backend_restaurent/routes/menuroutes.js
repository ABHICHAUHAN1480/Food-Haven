const express = require('express');
const router = express.Router();
const axios = require('axios');
const MenuItems = require('../modules/MenuItems');


router.get('/getmenu', async (req, res) => {
    try {
        const menuItems = await MenuItems.find({});
        res.status(200).json({
            success: true,
            data: menuItems,
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch menu items',
        });
    }
});

// router.post('/addmenu', async (req, res) => {
//     try {
//         const { id, title, price, image_url, servings, category,diet,rating } = req.body;
       
//         const menuItem = new MenuItems({
//             id:id,
//             title: title,
//             price: price,
//             image_url:  image_url,
//             servings: servings,
//             category: category,
//             diet:diet,
//             rating:rating
//         });

//         const savedMenuItem = await menuItem.save();
//         res.status(200).json({
//             success: true,
//             data: savedMenuItem,
//         });
//     } catch (error) {
//         console.error('Error adding menu item:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to add menu item',
//         });
//     }
// });


module.exports = router;