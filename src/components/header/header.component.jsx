import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component.jsx'
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

// import './header.style.scss'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.style'

import {ReactComponent as Logo} from '../../assets/crown.svg.svg'

// currentUser, hidden được lấy từ this.props.currentUser và this.props.hidden (nằm trong redux store)
const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>   // sign out người dùng đăng nhập bằng firebase*
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            //show or hide CartDropdown base on hidden prop
            hidden ? null : <CartDropdown/>
        }
    </HeaderContainer>
)
                            // automatically pass state variable into selectCurrentUser and selectCartHidden
const mapStateToProps = createStructuredSelector({      
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

//connect store vào <Header>
export default connect(mapStateToProps)(Header);