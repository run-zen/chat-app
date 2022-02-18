import React from "react";
import styles from './index.module.css'

export function AlertSuccess({header, message}) {

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.header} text-success`}>
                <span><i className="bi bi-check-circle-fill"></i></span>{header? header:'success'}
            </div>
            <div className={`${styles.subheader}`}>{message}</div>
        </div>
    )
}

export function AlertError({header, message}) {

    return (
        <div className={`${styles.wrapper}`}>
            {
                header ?
                    <div className={`${styles.header} text-danger`}>
                        <span><i className="bi bi-exclamation-circle-fill"></i></span>{header}
                    </div> : null
            }
            <div className={`${styles.subheader}`}>{message}</div>
        </div>
    )
}