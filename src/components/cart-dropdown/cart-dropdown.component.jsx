import React from 'react'

import CustomButton from '../custom-button/custom-button.component.jsx'

import './cart-dropdown.style.scss';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items'></div>
        <CustomButton inverted>GO TO CHECKOUT</CustomButton>
    </div>
)

export default CartDropdown;