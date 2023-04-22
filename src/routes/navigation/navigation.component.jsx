import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase.utils';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <Link className='nav-link' to='/shop' >
                        SHOP
                    </Link>

                {currentUser ?
                    (
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>  
                    )
                    :
                    (
                    <NavLink to='/auth' >
                        SIGN IN
                    </NavLink>
                    )
                }
                <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;