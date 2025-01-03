const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/setmenu', async (req, res) => {
    try {
        // const query = req.query.query || "breads"; 
        // const number = req.query.number || 7;

        // // const response = await axios.get('https://api.spoonacular.com/food/menuItems/search', {
        // //     params: {
        // //         query,
        // //         number,
        // //         apiKey: process.env.Spoonacular_Api,
        // //     },
        // // });
        const mockResponse = {
            menuItems: [
                {
                    id: 419357,
                    title: "Burger Sliders",
                    restaurantChain: "Hooters",
                    image: "https://img.spoonacular.com/menu-items/419357-312x231.png",
                    servings: { number: 1, size: 2, unit: "oz" },
                    price: 29
                },
                {
                    id: 424571,
                    title: "Bacon King Burger",
                    restaurantChain: "Burger King",
                    image: "https://img.spoonacular.com/menu-items/424571-312x231.png",
                    servings: { number: 1, size: 2, unit: "oz" },
                    price: 19
                },
                {
                    id: 424573,
                    title: "Bacon King Burger",
                    restaurantChain: "Burger King",
                    image: "https://img.spoonacular.com/menu-items/424571-312x231.png",
                    servings: { number: 1, size: 2, unit: "oz" },
                    price: 23
                },
                {
                    id: 3278,
                    title: "Bacon King Burger",
                    restaurantChain: "Burger King",
                    image: "https://img.spoonacular.com/menu-items/424571-312x231.png",
                    servings: { number: 1, size: 2, unit: "oz" },
                    price: 14
                },
                {
                    id: 4243563,
                    title: "Bacon King Burger",
                    restaurantChain: "Burger King",
                    image: "https://img.spoonacular.com/menu-items/424571-312x231.png",
                    servings: { number: 1, size: 2, unit: "oz" },
                    price: 14
                },
                {
                    id: 424363,
                    title: "Bacon King Burger",
                    restaurantChain: "Burger King",
                    image: "https://img.spoonacular.com/menu-items/424571-312x231.png",
                    servings: { number: 1, size: 2, unit: "oz" },
                    price: 14
                },
                
            ],
        };

        const filteredMenuItems = mockResponse.menuItems;

        res.status(200).json({
            success: true,
            data: filteredMenuItems,
        });
    } catch (error) {
        console.error('Error fetching menu items:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch menu items',
        });
    }
});


module.exports = router;