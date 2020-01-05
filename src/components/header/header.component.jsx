import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
// Assets
import { ReactComponent as Logo } from '../../assets/crown.svg';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                </div>
            </div>
        );
    }
}

export default Header;
