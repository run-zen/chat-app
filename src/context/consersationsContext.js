import React, {useContext, useEffect, useState, useCallback} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import {useContacts} from "./contactsContext";
import {v4 as uuidv4} from "uuid";
import {useSocket} from "./SocketsProvider";

const ConversationsContext = React.createContext()

export function useConversation() {
    return useContext(ConversationsContext)
}

export function ConversationsContextProvider({id,myInfo, children}) {

    const [conversations, setConversations] = useLocalStorage('conversations', [])

    const {contacts} = useContacts()
    const socket = useSocket()
    const [selectedConversationIndex, setselectedConversationIndex] = useState(0)

    const createConversation = (recipients) => {
        setConversations(prev => [...prev, { id:uuidv4(),recipients, messages: []}])
    }

    const formattedConversations = conversations.map((convo, index) => {
        const recipients = convo.recipients.map(id => {
            const contact = contacts.find(contact => {
                return contact.id === id
            })

            const name = (contact && contact.name) || id
            return {id: id, name}
        })

        const messages = convo.messages.map(item => {
            const contact = contacts.find(contact => {
                return contact.id === item.sender
            })

            let name = (contact && contact.name) || item.sender
            const fromMe = id === item.sender
            if(fromMe) {
                name = myInfo.name
            }

            return {...item,senderName:name,fromMe}
        })

        const selected = index === selectedConversationIndex

        return {...convo,messages, recipients, selected}
    })

    const addMessageToConversation = useCallback(({convoId, recipients, text, sender}) => {
        setConversations(prev => {
            let madeChange = false
            const newMessage = {sender, text}


            const newConversation = prev.map(convo => {
                if(convo.id === convoId) {
                    madeChange = true
                    return {
                        ...convo,messages:[...convo.messages,newMessage]
                    }
                }

                return convo
            })

            if (madeChange) {
                return newConversation

            } else {
                return [...prev, {id: convoId, recipients, messages: [newMessage]}]
            }
        })
    },[setConversations])

    useEffect(() => {
        if(socket == null) {
            return
        }
        socket.on('receive-message',addMessageToConversation)

        return () => socket.off('receive-message')
    },[socket,addMessageToConversation])

    const sendMessage = (convoId,recipients, message) => {
        socket.emit('send-message',{convoId,recipients,text:message})

        addMessageToConversation({convoId, recipients, text:message, sender:id})
    }

    const value = {
        conversations: formattedConversations,
        createConversation,
        selectConversationIndex: setselectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage
    }
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}