import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

import { auth } from '../../firebase/firebase.utils'

import './header.style.scss'

import {ReactComponent as Logo} from '../../assets/crown.svg.svg'

// currentUser được lấy từ this.props.currentUser (nằm trong redux store)
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

const mapStateToProps = state => ({       //state là rootReducer
    currentUser: state.user.currentUser
})

//connect store vào <Header>
export default connect(mapStateToProps)(Header);