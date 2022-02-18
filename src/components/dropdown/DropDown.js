import React, {Fragment, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid'
import styles from './dropdown.module.css'

export default function CustomDropDown({children}) {

    const [showMenu,setShowMenu] = useState(false)
    const [id,setId] = useState(uuidv4())

    useEffect(() => {
        document.addEventListener('click',handleClickEvent)

        return () => document.removeEventListener('click',handleClickEvent)

    },[])

    const handleClickEvent = (e) => {
        if(e.target.id !== id)
            setShowMenu(false)
    }

    const handleOpen = (e) => {
        e.stopPropagation()
        setShowMenu(prev => !prev)
    }

    return(
        <Fragment>
            <div className={`${styles.custom_dropDown}`}>
                <div id={id} className={`${styles.cd_button} pointer`} onClick={handleOpen}>
                    <i id={id}  className="bi bi-three-dots-vertical"></i>
                </div>
                <div className={`${styles.cd_menu} ${showMenu? styles.showMenu : ''}`}>
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

export function CDItem(props) {
    return <div {...props} className={props.className + ` ${styles.cd_item}`}>{props.children}</div>
}