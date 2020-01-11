import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Style
import './header.styles.scss';
// Assets
import { ReactComponent as Logo } from '../../assets/crown.svg';
// Components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Firebase Auth
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo' />
        </Link>
        <div className='header-links'>
            <Link className='header-link' to='/shop'>
                SHOP
            </Link>
            <Link className='header-link' to='/contact'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='header-link' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='header-link' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
);

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);
