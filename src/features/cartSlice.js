import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state.items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveToLocalStorage(state);
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveToLocalStorage(state);
    },
    loadFromLocalStorage: (state) => {
      state.items = JSON.parse(localStorage.getItem('cart')) || [];
    },
  },
});

export const { addToCart, removeItem, incrementQuantity, decrementQuantity, loadFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
