import React, {Fragment, useEffect, useRef, useState} from "react";
import {Button, Form, InputGroup} from 'react-bootstrap'
import styles from './openConversation.module.css'
import {useDispatch, useSelector} from "react-redux";
import {ChatDataActions} from "../../redux/reducers/chatDataReducer";
import {Message} from "../../Models/ChatData";
import Loader from "../shared/CustomLoader/Loader";
import {asyncCall} from "../../services/utils";
import {chatApi} from "../../services/axiosConfig";
import {API} from "../../services/api";
import axios from "axios";
import {useSocket} from "../../context/SocketsProvider";
import useSound from 'use-sound';
import {ChatActions} from "../../redux/reducers/chatsReducer";
// import Sound from '../../Notification.mp3';

export default function OpenConversation() {

    // const [play, { stop, pause }] = useSound(Sound);


    const [text, setText] = useState('')
    const [scroll, setscroll] = useState(false)
    const [loading, setloading] = useState(false)
    const [source, setsource] = useState(null)

    const selectedChat = useSelector(state => state.selectedChat)
    const user = useSelector(state => state.user)
    const chatData = useSelector(state => state.chatData)

    const messagesRef = useRef()

    const dispatch = useDispatch()
    const socket = useSocket()

    useEffect(() => {
        showNewMessage()
    }, [scroll, selectedChat, chatData, loading])

    useEffect(() => {
        if (socket == null) {
            return
        }
        socket.on('receive-message', addMessageToChat)

        return () => socket.off('receive-message')
    }, [socket])

    useEffect(() => {
        setloading(false)
        if (selectedChat && selectedChat.id) {
            if (selectedChat.messages.length === 0) {
                loadMessages(selectedChat)
            }
        }
    }, [selectedChat])

    async function addMessageToChat(data) {
        console.log(data)
        const payload = {
            id: parseInt(data.convoId)
        }
        const [res,err] = await asyncCall(chatApi.post,API.get_message_by_id,payload)

        if(res) {
            dispatch({
                type: ChatDataActions.addMessage,
                payload: res.data.data
            })

            dispatch({
                type: ChatActions.sendToTop,
                payload: {
                    id: res.data.data.chat_id
                }
            })
            // play()
        }

    }


    const showNewMessage = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollBy({top: messagesRef.current.scrollHeight, left: 0,})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const message = new Message({
            chat_id: selectedChat.id,
            sender_id: user.id,
            receiver_id: selectedChat.receiver_id,
            text_message: text,
        })

        dispatch({
            type: ChatDataActions.addMessage,
            payload: message
        })

        dispatch({
            type: ChatActions.sendToTop,
            payload: selectedChat
        })

        const payload = {
            ...message
        }

        const [res, err] = await asyncCall(chatApi.post, API.create_message, payload)

        if (res) {
            const created_message = res.data.data
            message.id = created_message.id
            dispatch({
                type: ChatDataActions.messageSent,
                payload: message
            })
            socket.emit('send-message', {convoId: created_message.id, recipients: [selectedChat.phone_number], text: ''})
        }

        if (err) {
            console.log(err.response)
        }

        setText('')
        setscroll(prev => !prev)
    }

    const loadMessages = async (chat, initial = false) => {

        if(!initial) {
            setloading(true)
        }

        if (source) {
            source.cancel()
        }
        const CancelToken = axios.CancelToken;
        const token = CancelToken.source();
        setsource(token)
        const payload = {
            chat_id: selectedChat.id
        }

        const messagesPayload = {
            id: selectedChat.id,
            messages: []
        }
        const [res, err] = await asyncCall(chatApi.post, API.get_messages, payload, {
            cancelToken: token.token
        })

        if (res) {
            messagesPayload.messages = res.data.data

            dispatch({
                type: ChatDataActions.addInitialMessages,
                payload: messagesPayload
            })
            setloading(false)

        }

        if (err) {
            if (!axios.isCancel(err)) {
                setloading(false)
            }
        }

    }

    return (
        <Fragment>
            <div className={'d-flex flex-column flex-grow-1'}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.myInfo}`}>
                        <div
                            className={`${styles.userImg}`}>{selectedChat.receiver ? selectedChat.receiver[0] : 'U'}</div>
                        <div className={`${styles.userName}`}>{selectedChat.receiver}</div>

                    </div>
                    <div>

                    </div>
                </div>
                <div className={'flex-grow-1 overflow-auto myMessages'} ref={messagesRef}>
                    {
                        !loading &&
                        <div className={`${styles.messagesWrapper}`}>
                            {selectedChat.messages.map((item, index) => {
                                const fromMe = item.sender_id === user.id
                                return (
                                    <div
                                        key={index}
                                        className={`my-1 d-flex flex-column  ${fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                                        style={{
                                            maxWidth: '75%'
                                        }}
                                    >
                                        <div
                                            className={`rounded px-2 py-1 ${fromMe ? 'bg-primary text-white' : 'bg-secondary border text-white'}`}
                                        >
                                            <div className={`mr-2`}>
                                                {item.text_message}
                                            </div>
                                            {
                                                fromMe &&
                                                <div className={`${styles.textInfo}`}>
                                                    {
                                                        item.is_pending ?
                                                            <i className="bi bi-clock"></i> :
                                                            <i className="bi bi-check2"></i>
                                                    }
                                                    {/*<i className="bi bi-check2-all"></i>*/}
                                                </div>
                                            }
                                        </div>
                                    </div>)
                            })}
                        </div>
                    }
                    {
                        loading &&
                        <div className={`d-flex align-items-center justify-content-center h-100`}>
                            <Loader width={100}/>
                        </div>
                    }
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={'m-2'}>
                        <InputGroup>
                            <Form.Control
                                required
                                value={text}
                                onChange={e => setText(e.target.value)}
                                style={{
                                    height: '75px',
                                    resize: 'none'
                                }}
                                className={'typeMessage'}
                            />
                            <InputGroup.Append>
                                <Button type={'submit'}>Send</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        </Fragment>
    )
}