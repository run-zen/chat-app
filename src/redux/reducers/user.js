export const UserActions = {
    setState: 'setState_user',
    removeState: 'removeState_user'
}

const initial_state = {
    name: '',
    phone_number: '',
}

export function userReducer(state = initial_state, action,) {
    switch (action.type) {
        case UserActions.setState:
            if (action.payload) {
                return {...state,...action.payload}
            } else {
                return state
            }
        case UserActions.removeState:
            return initial_state
        default:
            return state
    }
}