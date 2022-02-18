import {ChatData} from "../../Models/ChatData";

const Action = {
    'setState': 'setState_chat',
    'removeState': 'removeState_chat',
    'addMessage': 'addMessage_chat',
    'initialize': 'initializeState_chat',
    'addChat': 'addChat_chat',
    'sendToTop': 'chat_sendToTop'
}

const Initial_state = []

export default function chatsReducer(state = Initial_state,action) {
    switch (action.type) {
        case Action.setState:
            return [...action.payload]
        case Action.removeState:
            return Initial_state
        case Action.addChat:
            return addNewChat(state,action.payload)
        case Action.initialize:
            return initializeState(state,action.payload)
        case Action.sendToTop:
            return sendToTop(state,action.payload)
        default:
            return state
    }
}

export {Action as ChatActions}

function sendToTop(state,data) {
    let new_state = [...state]

    if(new_state[0].id === data.id) {
        return state
    }

    const chat = new_state.filter(item => item.id === data.id)[0]
    console.log(chat)
    new_state = new_state.filter(chat => chat.id !== data.id)
    new_state.unshift(chat)

    return new_state
}

function initializeState(state,data) {
    const new_state = []
    for(const temp of data) {
        new_state.push(temp)
    }

    return new_state
}

function addNewChat(state,data) {
   return [data,...state]
}