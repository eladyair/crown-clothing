import React from 'react';
import { connect } from 'react-redux';
import './checkout.styles.scss';
// Components
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
// Redux related
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

const CheckoutPage = ({ cartItems, totalSum }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(item => (
            <CheckoutItem key={item.id} item={item} />
        ))}

        <div className='total'>
            <span>TOTAL: ${totalSum}</span>
        </div>
        <div className='test-warning'>
            *Please use the following test credit card for payments*
            <br />
            4242424242424242 - Exp: 01/20 - CW: 123
        </div>
        <StripeCheckoutButton price={totalSum} />
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalSum: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);