import { TOGGLE_CART_HIDDEN, ADD_ITEM, REMOVE_ITEM, DELETE_ITEM, CLEAR_CART } from '../types';

export const toggleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: REMOVE_ITEM,
    payload: item
});

export const deleteItem = item => ({
    type: DELETE_ITEM,
    payload: item
});

export const clearCart = () => ({
    type: CLEAR_CART
});
