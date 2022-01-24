import React, {Fragment} from 'react'
import Login from "./login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";

function App() {

    const [id,setId] = useLocalStorage('id')

    return (
        <Fragment>
            {
                id? <Dashboard id={id}/> : <Login onIdSubmit={setId} />
            }
        </Fragment>
    );
}

export default App;
