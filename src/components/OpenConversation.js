import React, {Fragment, useRef, useState, useEffect} from "react";
import {Button, Form, InputGroup} from 'react-bootstrap'
import {useConversation} from "../context/consersationsContext";

export default function OpenConversation() {

    const [text,setText] = useState('')

    const lastMessageRef = useRef()

    const {sendMessage,selectedConversation} = useConversation()

    useEffect(() => {
        if(lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({smooth: true})
        }
    }, [selectedConversation])

    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.id, selectedConversation.recipients.map(r=>r.id), text)
        setText('')
    }


    return (
        <Fragment>
            <div className={'d-flex flex-column flex-grow-1'}>
                <div className={'flex-grow-1 overflow-auto myMessages'}>
                    <div className={'d-flex flex-column align-items-start justify-content-end px-3'}>
                        {selectedConversation.messages.map((item,index) => {
                            const lastMessage = selectedConversation.messages.length-1 === index
                            return (
                                <div
                                    ref={lastMessage? lastMessageRef: null}
                                    key={index}
                                    className={`my-1 d-flex flex-column  ${item.fromMe? 'align-self-end align-items-end' : 'align-items-start'}`}
                                    style={{
                                        maxWidth:'75%'
                                    }}
                                >
                                    <div
                                        className={`rounded px-2 py-1 ${item.fromMe ? 'bg-primary text-white': 'border'}`}
                                    >
                                        {item.text}
                                    </div>
                                    <div
                                        className={`text-muted small ${item.fromMe? 'text-right': ''}`}
                                    >
                                        {item.fromMe ? "You" : item.senderName}
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={'m-2'}>
                        <InputGroup>
                            <Form.Control
                                as={'textarea'}
                                required
                                value={text}
                                onChange={e => setText(e.target.value)}
                                style={{
                                    height:'75px',
                                    resize:'none'
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