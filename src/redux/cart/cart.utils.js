// utils để reducer thao tác với data

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find( cartItem => 
        cartItem.id === cartItemToAdd.id)
    
    if(existingCartItem){
        return cartItems.map( cartItem=> (
            // increase quantity of the existing item in the cart by 1
            cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity +1} : cartItem
        )) 
    }
                                        //give new item to cart quantity of 1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(
        cartItem => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItemToRemove.quantity -1 }: cartItem
    )

}