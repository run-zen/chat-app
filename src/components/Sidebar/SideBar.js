import React, {Fragment, useState} from 'react'
import Conversations from "../conversation/Conversations";
import styles from './sidebar.module.css'
import {useDispatch, useSelector} from "react-redux";
import CustomDropDown, {CDItem} from "../dropdown/DropDown";
import FullLoader from "../shared/FullLoader";
import {UserActions} from "../../redux/reducers/user";
import {TokenAction} from "../../redux/reducers/tokenReducer";
import {useAlert} from "../../context/snackbarContext";
import {ChatActions} from "../../redux/reducers/chatsReducer";
import NewChatModal from "../Modals/NewChatModal";

export default function SideBar({id}) {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [openUserDrawer, setOpenUserDrawer] = useState(false)
    const alert = useAlert()

    const [modalOpen, setmodalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setloadingMessage] = useState('')


    const closeModal = () => {
        setmodalOpen(false)
    }

    const signOut = () => {
        setLoading(true)
        setloadingMessage('signing out')

        setTimeout(() => {
            dispatch({
                type: UserActions.removeState
            })
            dispatch({
                type: TokenAction.removeState
            })

            dispatch({
                type: ChatActions.removeState,
            })
            alert.success('Logged out successfully','Logout', 1000)
            setLoading(false)
        },1000)
    }

    return (
        <Fragment>
            <div className={`d-flex flex-column ${styles.wrapper}`}>

                <div className={`${styles.userDrawer} ${openUserDrawer ? styles.showDrawer : ''}`}>
                    <div onClick={() => setOpenUserDrawer(false)} className={`${styles.dheader}`}>
                        <i className={`bi bi-arrow-left bi-bold ${styles.backIcon} pointer`}></i>
                    </div>
                </div>

                <div className={`${styles.header}`}>
                    <div className={`${styles.myInfo}`} onClick={() => setOpenUserDrawer(true)}>
                        <div className={`${styles.userImg}`}>{user.name ? user.name[0] : 'U'}</div>
                        <div className={`${styles.userName}`}>{user.name}</div>

                    </div>
                    <div>
                        <CustomDropDown>
                            <CDItem onClick={() => {
                                setmodalOpen(true)
                            }}>
                                New Chat
                            </CDItem>
                            <CDItem onClick={() => {
                                console.log('clicked')
                            }}>
                                Settings
                            </CDItem>
                            <CDItem onClick={signOut}>
                                Sign out
                            </CDItem>

                        </CustomDropDown>
                    </div>
                </div>
                <div className={`d-flex flex-column ${styles.main}`}>
                    <Conversations/>
                    {/*<div className={'p-2 border-top border-right small'}>*/}
                    {/*    Your ID : <span className={'text-muted'}>{id}</span>*/}
                    {/*</div>*/}
                    {/*<Button className={'rounded-0'} onClick={() => setmodalOpen(true)}>*/}
                    {/*    New {converstionsOpen ? 'Conversation' : 'Contact'}*/}
                    {/*</Button>*/}


                </div>
            </div>

            <NewChatModal modalOpen={modalOpen} closeModal={closeModal} />
            {
                loading ?
                    <FullLoader message={loadingMessage}/> : null
            }
        </Fragment>
    )
}