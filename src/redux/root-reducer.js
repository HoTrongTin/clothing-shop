
// combine các Reducer nhỏ thành một reducer lớn, vì phân chia các reducer ra riêng lẻ cho dễ quản lí code
import {combineReducers} from 'redux';

import userReducer from './user/user.reducer'

export default combineReducers({
    user: userReducer
})