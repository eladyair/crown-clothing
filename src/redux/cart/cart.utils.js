export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existtingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (existtingCartItem) {
        return cartItems.map(item => (item.id === cartItemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removetemFromCart = (cartItems, cartItemToRemove) => {
    const existtingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    if (existtingCartItem.quantity === 1) {
        return deleteItemFromCart(cartItems, existtingCartItem);
    }

    return cartItems.map(item => (item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item));
};

export const deleteItemFromCart = (cartItems, cartItemToDelete) => {
    return cartItems.filter(item => item.id !== cartItemToDelete.id);
};
