import React from 'react'
import { connect } from 'react-redux'

import CustomButton from '../custom-button/custom-button.component.jsx'
import CartItem from '../cart-item/cart-item.component.jsx'

import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                ))
            }
        </div>
        <CustomButton inverted>GO TO CHECKOUT</CustomButton>
    </div>
)
                        // root-reducer --> cart-reducer --> CartItems
const mapStateToProps = ({ cart: {cartItems}}) => ({
    cartItems
})

export default connect(mapStateToProps)(CartDropdown);