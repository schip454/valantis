import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./items/slice";


export const store = configureStore({
  reducer: {
    items: itemsReducer
  },
})
