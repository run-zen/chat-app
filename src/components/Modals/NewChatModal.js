import React, {Fragment, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import FullLoader from "../shared/FullLoader";
import {useAlert} from "../../context/snackbarContext";
import {ChatData} from "../../Models/ChatData";
import {useDispatch} from "react-redux";
import {asyncCall} from "../../services/utils";
import {chatApi} from "../../services/axiosConfig";
import {API} from "../../services/api";
import {ChatActions} from "../../redux/reducers/chatsReducer";

export default function NewChatModal({modalOpen, closeModal}) {

    const [phone, setphone] = useState('')
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch()

    const alert = useAlert()

    const resetFields = () => {
        setphone('')
    }


    const enterNumber = (e) => {
        let value = e.target.value
        if(value.length > 10) {
            return
        }
        let num = parseInt(value)
        if(num || value === '') {
            setphone(value)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setloading(true)

        const payload = {
            participant: phone
        }

        const [res,err] = await asyncCall(chatApi.post, API.chat_create,payload)

        if(res && res.status === 200) {
            dispatch({
                type: ChatActions.addChat,
                payload: res.data.data
            })
            alert.success('chat successfully created',null,2000)
            resetFields()
            closeModal()
        }

        if(err) {
            if(err.response && err.response.data && err.response.data.detail) {
                alert.error(err.response.data.detail,'Error')
            } else {
                alert.error('chat not created','Error')
            }
        }

        setloading(false)

    }

    return (
        <Fragment>
            {
                !loading &&
                <Modal show={modalOpen}
                       backdrop="static"
                       keyboard={false}
                       onHide={closeModal}
                >
                    <Modal.Header closeButton>
                        New Chat
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group >
                                <div className='text-center text-uppercase'>
                                    <Form.Label className='font-weight-bold font'>
                                        Phone Number
                                    </Form.Label>
                                </div>

                                <Form.Control type='text' value={phone} required onChange={enterNumber}/>
                            </Form.Group>
                            <Button type={'submit'} className={'mr-2'}>
                                Create
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            }
            {
                loading ?
                    <FullLoader message={'creating'}/> : null
            }
        </Fragment>
    )
}