import {v4 as uuidv4} from 'uuid'

export class Message {
    constructor(message) {
        this.id = message.id || null
        this.chat_id = message.chat_id
        this.sender_id = message.sender_id
        this.receiver_id = message.receiver_id
        this.text_message = message.text_message
        this.is_pending = true
        this.pending_id = uuidv4()
    }
}

export class ChatData {
    constructor(data) {
        this.id = data.id
        this.participants = data.participants
        this.removed_participants = data.removed_participants
        this.receiver = data.receiver
        this.receiver_id = data.receiver_id
        this.phone_number = data.phone_number
        this.last_accessed = data.last_accessed
        this.messages = []
    }
}