
// combine các Reducer nhỏ thành một reducer lớn, vì phân chia các reducer ra riêng lẻ cho dễ quản lí code
import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist'

// user actual localStorage
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

const persistConfig = {
    key: 'root',    // include persist storage into root reducer
    storage,
    whitelist: ['cart']  // object trong root-reducer được đưa vào persist storage
}

const  rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
