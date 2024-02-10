// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) =>{
        const itempresent =state.cart.find((item)=>item.id===action.payload.id);
        if(itempresent){
            itempresent.quantity++;
        }
        else{
           state.cart.push({...action.payload,quantity:1})
        }
    },
    emptyCart: (state) => {
      state.cart= [];
    },
   
  },
});

export const { addToCart, emptyCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.cart;
const totalPrice = state=>state.cart.cart.values(cart).reduce((sum, quantity) => sum + item.quantity, 0);

export default cartSlice.reducer;









