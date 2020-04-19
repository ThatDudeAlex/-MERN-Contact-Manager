import {useState} from 'react'

// hook that handles form states
export const usePicture = () => {
    // initial state
    const [picture, setPicture] = useState("")

    return [
        picture,
        (event) => {
            const url = URL.createObjectURL(event.target.files[0])
            // updates state depending based on user input
            setPicture({picture: url})
        }
    ];
}