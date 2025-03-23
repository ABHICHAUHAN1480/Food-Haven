# Food Heaven

## Description  
Food Heaven is a modern **MERN stack** restaurant web application integrated with **Clerk authentication**. It allows users to explore the restaurant menu, place **online food orders**, and make **table reservations**. Designed for a seamless dining experience, it caters to both **dine-in and takeaway** customers.

## Features  
✅ **Menu Showcase** – Browse restaurant dishes with images, descriptions, and pricing.  
✅ **Online Ordering** – Add food to the cart and place an order seamlessly.  
✅ **Table Reservations** – Reserve a table by selecting date, time, and number of guests.  
✅ **User Authentication** – Secure login & registration via **Clerk**.  

## Videos (Demo & Walkthroughs)
- **Home Page** 
<video src="https://github.com/user-attachments/assets/a13fdef7-7bf0-4eec-bf96-e73daf7be742" ></video>
- **Menu Page**
  <video src="https://github.com/user-attachments/assets/c0e68400-eec9-4aab-87d5-667b3d215e4a" ></video>
- **Cart Page**
  <video src="https://github.com/user-attachments/assets/38492a8b-f2bb-4390-b37d-20a8cedfd93e" ></video>
- **Order Page**
   <video src="https://github.com/user-attachments/assets/b808f725-cb76-47fd-b577-c80ea1e5ba2f" ></video>
## Images (Screenshots)   
- **Reservations table**
  ![reservation_table](https://github.com/user-attachments/assets/5c611ef9-3b01-43e5-811b-db90f85befff)
- **Reserved tavle**
  ![reserved](https://github.com/user-attachments/assets/01d7b84b-e321-48fb-9898-8f7d6c729881)

## Installation  

### **Prerequisites**  
Make sure you have the following installed:  
- **Node.js** (Latest LTS version)  
- **MongoDB** (Local/Cloud - MongoDB Atlas)  
- **npm** or **yarn**  
- **Clerk API Key** (for authentication)  

### **Setup Instructions**  
1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/yourusername/food-heaven.git
cd food-heaven
```  
2️⃣ **Install Dependencies**  
```sh
npm install
```  
3️⃣ **Set Up Environment Variables**  
- Create a `.env` file in the root directory.  
- Add the following:  
```env
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_api_key
```  
4️⃣ **Run the Development Server**  
```sh
npm run dev
```  
The app should now be running at **`http://localhost:3000`**.

## Usage  
- **To place an order** → Go to the **menu**, select items, and proceed to checkout.  
- **To reserve a table** → Navigate to the **reservation section**, enter details, and confirm booking.  
- **To sign up or log in** → Use **Clerk authentication** for a secure experience.  

## Deployment  
To deploy **Food Heaven**, use:  
- **Vercel/Netlify** → for frontend  
- **Render/Heroku** → for backend  
- **MongoDB Atlas** → for cloud database  

## Contributing  
Contributions are always welcome! To contribute:  
1. **Fork** the repository  
2. **Create** a new branch (`git checkout -b feature-branch`)  
3. **Commit** your changes (`git commit -m "Add new feature"`)  
4. **Push** the changes (`git push origin feature-branch`)  
5. **Create** a pull request  


###  Show Your Support  
⭐ If you like this project, don't forget to **star the repository** on GitHub!  
