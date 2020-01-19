import React from 'react';
import { connect } from 'react-redux';
// Style
//import './header.styles.scss';
// Assets
import { ReactComponent as Logo } from '../../assets/crown.svg';

// Styled Components
import { HeaderContainer, LogoContainer, HeaderLinksContainer, HeaderLink } from './header.styles';

// Components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Firebase Auth
import { auth } from '../../firebase/firebase.utils';
// Redux related
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <HeaderLinksContainer>
            <HeaderLink to='/shop'>SHOP</HeaderLink>
            <HeaderLink to='/contact'>CONTACT</HeaderLink>
            {currentUser ? (
                <HeaderLink as='div' onClick={() => auth.signOut()}>
                    SIGN OUT
                </HeaderLink>
            ) : (
                <HeaderLink to='/signin'>SIGN IN</HeaderLink>
            )}
            <CartIcon />
        </HeaderLinksContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
