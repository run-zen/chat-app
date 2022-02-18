const Action = {
    'setState': 'setState_token',
    'removeState': 'removeState_token'
}

const initial_state = {
    token: ''
}

export function TokenReducer(state = initial_state,action) {
    switch (action.type) {
        case Action.setState:
            return {...state,...action.payload}

        case Action.removeState:
            return initial_state

        default:
            return state

    }
}

export {Action as TokenAction}