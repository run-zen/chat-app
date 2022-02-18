import React from "react";
import styles from './index.module.css'
import Loader from "../CustomLoader/Loader";

export default function FullLoader({message =''}) {
    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.loader}`}>
                {
                    message?
                        <div>{message}</div>: null
                }
                <Loader width={100} height={50} />
            </div>
        </div>
    )
}