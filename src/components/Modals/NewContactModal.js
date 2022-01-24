import React, {Fragment, useRef} from "react";
import {Modal, Form, Button} from 'react-bootstrap'

export default function NewContactModal({closeModal}) {

    const idRef = useRef()
    const nameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    const createContact = (id, name) => {

    }

    return (
        <Fragment>
            <Modal.Header closeButton>
                Create Contact
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className='text-uppercase ml-1'>
                            <Form.Label className='font-weight-bold font'>
                                ID
                            </Form.Label>
                        </div>
                        <Form.Control type='text' ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <div className='text-uppercase ml-1'>
                            <Form.Label className='font-weight-bold font'>
                                Name
                            </Form.Label>
                        </div>
                        <Form.Control type='text' ref={nameRef} required />
                    </Form.Group>
                    <Button type={'submit'} className={'mr-2'}>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Fragment>
    )
}