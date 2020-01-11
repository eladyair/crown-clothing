import React from 'react';
import { connect } from 'react-redux';
import './cart-dropdown.styles.scss';

// Components
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.compnent';
// Redux related
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);
