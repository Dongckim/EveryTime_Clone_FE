import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
    reducer: { 
      LoginSignup, Main, PostPage, Board,
  },
  devTools: process.env.NODE_ENV === "developmetns" ? false : true,
  });
  
export default store;