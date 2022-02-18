import React, {Fragment, useEffect, useState} from 'react'
import Login from "./login";
import Dashboard from "./Dashboard/Dashboard";
import {SocketsProvider} from "../context/SocketsProvider";
import {useDispatch, useSelector} from "react-redux";
import Welcome from "./welcome";
import {chatApi} from '../services/axiosConfig'
import {UserActions} from "../redux/reducers/user";
import {API} from "../services/api";
import {ChatActions} from "../redux/reducers/chatsReducer";
import {asyncCall} from "../services/utils";
import {ChatDataActions} from "../redux/reducers/chatDataReducer";
import {SelectedChatAction} from "../redux/reducers/selectedChat";

function App() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()


    const [loading, setloading] = useState(true)
    const [message, setmessage] = useState('fetching data')

    useEffect(async () => {

        const [res, err] = await asyncCall(chatApi.get, API.get_me)
        if (res && res.status === 200) {
            dispatch({
                type: UserActions.setState,
                payload: res.data.data
            })
        }

        if(err) {
            dispatch({
                type: UserActions.removeState,
            })
        }
        setloading(false)

    }, [])

    useEffect(() => {
        if (user.phone_number) {
            fetchUserData()
        }
    }, [user])

    const fetchUserData = async () => {
        setloading(true)
        setmessage('fetching user data')

        setTimeout(async () => {
            const [res, err] = await asyncCall(chatApi.get, API.my_chats)

            if (res && res.status === 200) {
                dispatch({
                    type: ChatActions.initialize,
                    payload: res.data.data
                })

                dispatch({
                    type: ChatDataActions.initialize,
                    payload: res.data.data
                })

            }

            setloading(false)
        }, 1000)
    }

    const dashboard = (
        <SocketsProvider id={user.phone_number}>
            <Dashboard id={user.phone_number} name={user.name}/>
        </SocketsProvider>
    )

    return (
        <Fragment>
            {
                !loading ?
                    <div className={'app'}>
                        {
                            user && user.phone_number ? dashboard : <Login/>
                        }
                    </div> :
                    <Welcome message={message}/>
            }
        </Fragment>
    );
}

export default App;
