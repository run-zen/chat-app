import React, {Fragment} from 'react'
import SideBar from "./SideBar";
import OpenConversation from "./OpenConversation";
import {useConversation} from "../context/consersationsContext";

export default function Dashboard({id}) {

    const {selectedConversation} = useConversation()


    return (
        <Fragment>
            <div className={'d-flex flex-row'} style={{height: '100vh'}}>
                <SideBar id={id}/>
                {
                    selectedConversation ?
                        <OpenConversation conversation={selectedConversation}/> :
                        null
                }
            </div>
        </Fragment>
    )
}