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

// Redux related
import { signOutStart } from '../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <HeaderLinksContainer>
            <HeaderLink to='/shop'>SHOP</HeaderLink>
            <HeaderLink to='/contact'>CONTACT</HeaderLink>
            {currentUser ? (
                <HeaderLink as='div' onClick={signOutStart}>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
