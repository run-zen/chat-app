import React, {Fragment} from "react";
import styles from './header.module.css'
import {useSelector, useDispatch} from 'react-redux'

export default function Header() {

    const user = useSelector(state => state.user)

    return (
        <Fragment>
            <div className={`${styles.wrapper}`}>
                Header
            </div>
        </Fragment>
    )
}