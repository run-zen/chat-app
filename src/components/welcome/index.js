import React from "react";
import Loader from "../shared/CustomLoader/Loader";
import styles from './index.module.css'

export default function Welcome({message=''}){

    return (
        <div className={`${styles.wrapper}`}>
            <h2>Welcome to Chatty</h2>
            <Loader width={150} />
            <p>{message}</p>
        </div>
    )
}