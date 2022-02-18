import {Message, ChatData} from "../../Models/ChatData";

const Action = {
    'setState': 'setState_chatData',
    'removeState': 'removeState_chatData',
    'addMessage': 'addMessage_chatData',
    'initialize': 'initializeState_chatData',
    'messageSent': 'messageSent_chatData',
    'addInitialMessages':'set_initial_messages_chatData'
}

const Initial_state = []

export default function chatDataReducer(state = Initial_state, action) {
    switch (action.type) {
        case Action.setState:
            return action.payload
        case Action.addMessage:
            return addMessage(state, action.payload)
        case Action.messageSent:
            return messageSent(state, action.payload)
        case Action.removeState:
            return Initial_state
        case Action.initialize:
            return initializeState(state, action.payload)
        case Action.addInitialMessages:
            return addInitialMessages(state,action.payload)
        default:
            return state
    }
}

export {Action as ChatDataActions}

function initializeState(state, data) {
    const new_state = []
    for(const temp of data) {
        new_state.push(new ChatData(temp))
    }

    return new_state
}


function addMessage(state, message) {
    let found = false
    for (const temp of state) {
        if (temp.id === message.chat_id) {
            found = true
            temp.messages.push(message)
        }
    }

    if (!found) {
        const new_chat = new ChatData({id: message.chat_id})
        new_chat.messages.push(message)
        return [...state, new_chat]
    }

    return [...state]
}

function messageSent(state,message) {
    const new_state = [...state]
    for(const temp of new_state) {
        if(temp.id === message.chat_id) {
            for(const item of temp.messages) {
                if(item.pending_id === message.pending_id) {
                    item.is_pending = false
                    item.id = message.id
                }
            }
        }
    }

    return new_state
}

function addInitialMessages(state,data) {
    const new_state = [...state]
    for (const temp of state) {
        if (temp.id === data.id) {
            temp.messages = data.messages
        }
    }

    return new_state
}