import {useEffect, useState} from 'react'

const PREFIX = 'runzen-chat-app-'

export default function useLocalStorage(key, initial_value) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)

        if(jsonValue != 'undefined' && jsonValue !== null) {
            return JSON.parse(jsonValue)
        }

        if(typeof initial_value === 'function') {
            return initial_value()
        } else {
            return initial_value
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    }, [prefixedKey, value])

    return [value,setValue]
}