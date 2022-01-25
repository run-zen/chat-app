import React, {Fragment, useContext, useEffect, useState} from "react";
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketsProvider({children, id}) {

    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('https://runzen-chat-api.herokuapp.com/', {query: {id}})

        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )


}