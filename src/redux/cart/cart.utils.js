export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existtingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (existtingCartItem) {
        return cartItems.map(item => (item.id === cartItemToAdd.id ? { ...item, quantity: item.quantity++ } : item));
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
