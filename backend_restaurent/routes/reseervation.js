const express = require('express');
const router = express.Router();
const Reservations = require('../modules/Reservations');
const User = require('../modules/User');

router.post('/reservation', async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }

    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { fullname, bookingId,  time, date, email, phoneNumber, noofpeople, specialrequest } = req.body;
        const tableno = Math.floor(Math.random() * (69 - 23 + 1)) + 23;
        

        const reservation = new Reservations({
            clerkId: userId,
            fullname,
            bookingId,
            tableno,
            reservationtime: time,
            reservationdate: date,
            reservationstatus: "Confirmed",
            email,
            phoneNumber,
            noofpeople,
            specialrequest
        });

        await reservation.save(); 

        
        if (!user.tablereservation) {
            user.tablereservation = [];
        }

        user.tablereservation.push(reservation._id); 
        await user.save(); 

        res.status(200).json({
            success: true,
            data: {tableno}, 
        });

    } catch (error) {
        console.error('Error reserving table:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reserve table',
        });
    }
});

router.get('/getreservations', async (req, res) => {
    const userId = req.auth.userId;
    
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }

    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const now = new Date();

   
        const reservations = await Reservations.find({ _id: { $in: user.tablereservation } });

        for (const reservation of reservations) {
            
            const reservationDateTime = new Date(`${reservation.reservationdate}T${reservation.reservationtime}`);

            reservationDateTime.setHours(reservationDateTime.getHours()+2 );
            if (reservation.reservationstatus === "Confirmed" && reservationDateTime < now) {
                reservation.reservationstatus = "Expired";
                await reservation.save(); 
            }
        }
      
       res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reservations',
            error: error.message,
        });
    }
});

module.exports = router;
