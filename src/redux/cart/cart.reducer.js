import { TOGGLE_CART_HIDDEN, ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from '../types';
import { addItemToCart, removetemFromCart, deleteItemFromCart } from './cart.utils';
const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, payload)
            };
        case REMOVE_ITEM:
            return {
                ...state,
                cartItems: removetemFromCart(state.cartItems, payload)
            };
        case DELETE_ITEM:
            return {
                ...state,
                cartItems: deleteItemFromCart(state.cartItems, payload)
            };

        default:
            return state;
    }
};

export default cartReducer;
