import React, {Fragment, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useContacts} from "../../context/contactsContext";
import {useConversation} from "../../context/consersationsContext";

export default function NewConversationModal({closeModal}) {

    const [selectedContactIds,setselectedContactIds] = useState([])

    const {contacts} = useContacts()
    const {createConversation} = useConversation()


    const handleCheckboxChange = (contactId) => {
        setselectedContactIds((prev) => {
            if(prev.includes(contactId)) {
                return prev.filter(prevId => prevId !== contactId)
            } else {
                return [...prev, contactId]
            }
        } )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversation(selectedContactIds)
        setselectedContactIds([])
        closeModal()
    }

    return (
        <Fragment>
            <Modal.Header closeButton>
                Create Conversation
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type={'checkbox'}
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => {
                                    handleCheckboxChange(contact.id)
                                }}
                            />
                        </Form.Group>
                    ))}
                    <Button type={'submit'} className={'mr-2'}>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Fragment>
    )
}