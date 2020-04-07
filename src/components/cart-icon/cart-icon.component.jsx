import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg.svg'

import './cart-icon.style.scss';

                    // destruct toggleCartHidden action from this.props (props được lấy từ mapDispatchToProps)
const CartIcon = ({ itemCount, toggleCartHidden }) => (
    <div className='cart-icon' onClick={toggleCartHidden} >
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

                        // state được lấy từ redux store (root reducer)
const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})

const mapDispatchToProps = dispatch => ({
    // map action toggleCartHidden as props of <CartIcon>
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)