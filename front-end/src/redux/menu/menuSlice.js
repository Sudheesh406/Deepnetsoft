import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menu: null, 
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload; 
    },
    clearMenu: (state) => {
      state.menu = null; 
    },
  },
});

export const { setMenu, clearMenu } = menuSlice.actions;
export default menuSlice.reducer;