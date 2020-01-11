import React from 'react';
import './cart-dropdown.styles.scss';

// Components
import CustomButton from '../custom-button/custom-button.compnent';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items'></div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

export default CartDropdown;
