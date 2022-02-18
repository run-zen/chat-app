import React, {Fragment, useEffect, useState} from 'react'
import SideBar from "../Sidebar/SideBar";
import OpenConversation from "../OpenConversation/OpenConversation";
import {useDispatch, useSelector} from 'react-redux'
import styles from './dashboard.module.css'
import {chatApi} from "../../services/axiosConfig";
import {API} from "../../services/api";
import {ChatActions} from "../../redux/reducers/chatsReducer";

export default function Dashboard({id}) {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [loading, setloading] = useState(true)
    const [message, setmessage] = useState('fetching data')


    return (
        <Fragment>
            <div className={`d-flex flex-column overflow-hidden ${styles.dashboard}`}>
                <div className={`d-flex flex-row ${styles.main}`}>
                    <SideBar id={id}/>
                    <OpenConversation conversation={{}}/>
                </div>
            </div>

        </Fragment>
    )
}