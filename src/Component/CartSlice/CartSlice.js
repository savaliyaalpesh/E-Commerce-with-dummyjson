import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    cartItems: 0,
    cart: [],
    logoNumber: 0,
    data: '', 
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        search: (state, action) => {
            state.data = action.payload;
        },
        addCart: (state, action) => {
            const ExistingItem = state.cart.find((item) => item.id === action.payload.id);
            if (ExistingItem) {
                ExistingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
                state.logoNumber++;
            }
        },
        deleteData: (state, action) => {
            const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                if (state.cart[itemIndex].quantity > 1) {
                    state.cart[itemIndex].quantity -= 1;
                } else {
                    state.cart.splice(itemIndex, 1);
                    state.logoNumber--;
                }
            }
        },
    },
});

export const { addCart, deleteData, search } = counterSlice.actions;

export default counterSlice.reducer;
