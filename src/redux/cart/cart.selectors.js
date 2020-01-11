import { createSelector } from 'reselect';

// Input selector - Getting the part of the state that we want to work with
const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], cart => cart.cartItems);

export const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
    cartItems.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity, 0)
);
