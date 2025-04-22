import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './menu/menuSlice'

const store = configureStore({
  reducer: {
    menu:menuSlice
   
  }, 
});

export default store;