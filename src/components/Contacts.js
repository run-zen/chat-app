import React, {Fragment, useEffect, useState} from "react";
import {useContacts} from "../context/contactsContext";
import {ListGroup} from "react-bootstrap";

export default function Contacts() {

    const {contacts} = useContacts()

    return(
        <Fragment>
            <ListGroup variant={'flush'}>
                {contacts.map(contact => {
                    return (
                            <ListGroup.Item key={contact.id}>
                                {contact.name}
                            </ListGroup.Item>
                        )
                })}
            </ListGroup>
        </Fragment>
    )
}