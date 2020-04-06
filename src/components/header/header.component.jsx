import React from 'react'
import {Link} from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils'

import './header.style.scss'

import {ReactComponent as Logo} from '../../assets/crown.svg.svg'

const Header = ({currentUser}) => (
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
        </div>
    </div>
)

export default Header;