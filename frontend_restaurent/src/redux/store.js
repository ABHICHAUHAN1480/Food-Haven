// // store.js
// import { configureStore, createSlice } from '@reduxjs/toolkit';


// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItemsLength: 0, // Initial state for cart length
//   },
//   reducers: {
//     setCartItemsLength: (state, action) => {
//       state.cartItemsLength = action.payload; // Set the new cart length
//     },
//   },
// });

// // Export the action and the reducer
// export const { setCartItemsLength } = cartSlice.actions; // Exporting the action

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice.reducer, // Adding the reducer to the store
//   },
// });
