import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component.jsx'
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx'

import './header.style.scss'

import {ReactComponent as Logo} from '../../assets/crown.svg.svg'

// currentUser, hidden được lấy từ this.props.currentUser và this.props.hidden (nằm trong redux store)
const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>   // sign out người dùng đăng nhập bằng firebase*
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            //show or hide CartDropdown base on hidden prop
            hidden ? null : <CartDropdown/>
        }
    </div>
)
                            //destruct variable from state là rootReducer
const mapStateToProps = ( {user: {currentUser}, cart: { hidden }} ) => ({       
    currentUser,
    hidden
})

//connect store vào <Header>
export default connect(mapStateToProps)(Header);