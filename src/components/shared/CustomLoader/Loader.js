import React from "react";
import ReactLoading from "react-loading";
import styles from './loader.module.css'

export default function Loader({height = 80, width = 200}) {

    return (
        <div className={`d-flex flex-row align-items-center justify-content-center`}>
            <ReactLoading className={`${styles.loaderClass}`} type={'bubbles'} color={'green'} height={height} width={width} />
        </div>
    )
}