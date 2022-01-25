import React, {Fragment} from "react";
import {ListGroup} from "react-bootstrap";
import {useConversation} from "../context/consersationsContext";

export default function Conversations() {

    const {conversations,selectedConversation,selectConversationIndex} = useConversation()

    return(
        <Fragment>
            <ListGroup variant={'flush'}>
                {conversations.map((convo, index) => {
                    return (
                        <ListGroup.Item
                            key={index}
                            action
                            active={convo.selected}
                            onClick={() => {
                                selectConversationIndex(index)
                            }}
                        >
                            {
                                convo.recipients.map(item => item.name).join(', ')
                            }
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Fragment>
    )
}