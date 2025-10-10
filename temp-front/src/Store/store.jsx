import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice.jsx";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

