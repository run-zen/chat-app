import React, {Fragment} from 'react'
import Login from "./login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import {ContactsContextProvider} from "../context/contactsContext";
import {ConversationsContextProvider} from "../context/consersationsContext";
import {SocketsProvider} from "../context/SocketsProvider";

function App() {

    const [id, setId] = useLocalStorage('id',{})

    const dashboard = (
        <SocketsProvider id={id.id}>
            <ContactsContextProvider>
                <ConversationsContextProvider id={id.id} myInfo={id}>
                    <Dashboard id={id.id} name={id.name}/>
                </ConversationsContextProvider>
            </ContactsContextProvider>
        </SocketsProvider>
    )

    return (
        <Fragment>
            {
                id && id.id ? dashboard : <Login onIdSubmit={setId}/>
            }
        </Fragment>
    );
}

export default App;
