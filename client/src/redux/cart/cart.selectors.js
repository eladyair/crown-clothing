import { createSelector } from 'reselect';

// Input selector - Getting the part of the state that we want to work with
const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], cart => cart.cartItems);

export const selectCartHidden = createSelector([selectCart], cart => cart.hidden);

export const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
    cartItems.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
    cartItems.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)
);
