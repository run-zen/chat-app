const Actions = {
    'selectChat': 'setSelectedChat'
}

const initial_state = {
    messages:[]
}

export function SelectedChatReducer(state = initial_state,action) {
    switch (action.type) {
        case Actions.selectChat:
            return action.payload
        default:
            return state
    }
}

export {Actions as SelectedChatAction}