import React, {useContext} from 'react'
import {useSnackbar} from 'react-simple-snackbar'
import {AlertSuccess,AlertError} from "../components/shared/Alert";


const SnackBarContext = React.createContext()

export function useAlert() {
    return useContext(SnackBarContext)
}

export function AlertsContextProvider({children}) {

    const options = {
        position: 'top-right',
        style: {
            backgroundColor: 'white',
            alignItems: 'flex-start',
            minWidth: '100px',
            fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        },
        closeStyle: {
            color: 'black',
            fontSize: '12px',
        },
    }


    const [openSnackbar, closeSnackbar] = useSnackbar(options)

    const success = (message, header, duration = 5000) => {
        openSnackbar(<AlertSuccess message={message} header={header} />,[duration])
    }

    const error = (message, header, duration = 5000) => {
        openSnackbar(<AlertError message={message} header={header} />,[duration])
    }

    return (
        <SnackBarContext.Provider value={{success:success,error:error, close: closeSnackbar}}>
            {children}
        </SnackBarContext.Provider>
    )
}