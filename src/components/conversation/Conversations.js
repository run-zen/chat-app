import React, {Fragment, useEffect} from "react";
import {ListGroup} from "react-bootstrap";
import styles from './conversation.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SelectedChatAction} from "../../redux/reducers/selectedChat";
import {ChatActions} from "../../redux/reducers/chatsReducer";

export default function Conversations() {

    const chats = useSelector(state => state.chats)

    const chatData = useSelector(state => state.chatData)
    const selectedChat = useSelector(state => state.selectedChat)
    const dispatch = useDispatch()

    useEffect(() => {
        if(chats.length > 0) {
            selectChat(chats[0])
        }
    },[])


    const selectChat = (chat) => {
        for (const temp of chatData) {
            if (temp.id === chat.id) {
                dispatch({
                    type: SelectedChatAction.selectChat,
                    payload: temp
                })
            }
        }
    }

    return (
        <Fragment>
            <div className={`${styles.wrapper}`}>
                <ListGroup variant={'flush'}>
                    {chats.map((convo, index) => {
                        return (
                            <ListGroup.Item
                                key={index}
                                action
                                active={convo.id === selectedChat.id}
                                onClick={() => {
                                    selectChat(convo)

                                }}
                            >
                                {
                                    convo.receiver
                                }
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </Fragment>
    )
}