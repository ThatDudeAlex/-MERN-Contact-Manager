import {useState} from 'react'

// hook that handles form states
export const useErrMessages = (initailState) => {
    // initial state
    const [message, setMessage] = useState(initailState)

    return [
        message,
        (event) => {
            // updates state depending based on user input
            setValues({...values, [event.target.name]: event.target.value})
        }
    ];
}