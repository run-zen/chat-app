import React, {useState} from 'react'
import {Button, Modal, Nav, Tab} from 'react-bootstrap'
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./Modals/NewConversationModal";
import NewContactModal from "./Modals/NewContactModal";

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function SideBar({id}) {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const converstionsOpen = activeKey === CONVERSATIONS_KEY

    const [modalOpen, setmodalOpen] = useState(false)

    const closeModal = () => {
        setmodalOpen(false)
    }

    return (
        <div style={{maxWidth: '250px', width: 'fit-content'}} className={'d-flex flex-column'}>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant={'tabs'} className={'justify-content-center'}>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversions</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>

                </Nav>
                <Tab.Content className={'border-right overflow-auto flex-grow-1'}>
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className={'p-2 border-top border-right small'}>
                    Your ID : <span className={'text-muted'}>{id}</span>
                </div>
                <Button className={'rounded-0'} onClick={() => setmodalOpen(true)}>
                    New {converstionsOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen}
                   backdrop="static"
                   keyboard={false}
                   onHide={closeModal}
            >
                {
                    converstionsOpen ?
                        <NewConversationModal closeModal={closeModal}/>
                        :
                        <NewContactModal closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}