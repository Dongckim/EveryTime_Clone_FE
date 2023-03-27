import { configureStore } from "@reduxjs/toolkit";
import Board from "../modules/Board";



const store = configureStore({
    reducer: { 
      Board,
  },
  devTools: process.env.NODE_ENV === "developmetns" ? false : true,
  });
  
export default store;