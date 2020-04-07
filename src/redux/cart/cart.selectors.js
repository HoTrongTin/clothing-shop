// dùng selector, chỉ update component khi props thay đổi
import { createSelector } from 'reselect';

// state được đưa vào từ argument của selectCartItems và selectCartItemsCount
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart], //list of selector
    (cart) => cart.cartItems    // return the cartItems in cart
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],  //nếu call selectCartItemsCount(state) thì selectCartItems(state) được call trước để trả về cart.cartItems, rồi dùng cartItems đó làm argument cho callback dưới đây, trả về  giá trị là số lượng item trong cartItems
    (cartItems) => cartItems.reduce( (accumulator, cartItem) => accumulator + cartItem.quantity , 0)
)

//calculate total price
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( (accumulator, cartItem) => accumulator + cartItem.quantity*cartItem.price , 0)
)