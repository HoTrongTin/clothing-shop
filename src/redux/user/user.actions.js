// action sẽ được dùng chung với mapDispatchToProps = dispatch => {...}
export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})