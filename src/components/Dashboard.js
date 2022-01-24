import React, {Fragment} from 'react'
import SideBar from "./SideBar";

export default function Dashboard({id}) {


    return (
        <Fragment>
            <div className={'d-flex flex-row'} style={{height: '100vh'}}>
                <SideBar id={id}/>
            </div>
        </Fragment>
    )
}