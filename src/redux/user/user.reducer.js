
// Khi app vừa khởi động, chưa có giá trị state nào để đưa vào reducer
const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload     // chỉ thay đổi mục currentUser trong state
            }
        default:
            return state;       // ko thay đổi state khi không có action nào match
    }
}

export default userReducer;