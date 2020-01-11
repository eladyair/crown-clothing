import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Style
import './header.styles.scss';
// Assets
import { ReactComponent as Logo } from '../../assets/crown.svg';
// Firebase Auth
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
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
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
