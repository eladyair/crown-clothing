import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cart-icon.styles.scss';
// Importing an svg file as a react component
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// Redux actions
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartIcon = ({ toggleCartHidden, count }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{count}</span>
    </div>
);

const mapStateToProps = state => ({
    count: state.cart.cartItems.length
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
