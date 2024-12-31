const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const connectDB = require('./dbconnection/db');
connectDB();
const User = require('./modules/User');
const { clerkMiddleware } = require('@clerk/express');
app.use(cors());
app.use(express.json()); 
 



app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.use('/menu', menuRoutes);
app.use('/home', require('./routes/cart'));
app.use("/cart", require('./routes/cartpage'));
app.use("/order", require("./routes/order"))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

