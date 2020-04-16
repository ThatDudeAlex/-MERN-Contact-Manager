import {useState} from 'react'

// hook that handles form states
export const useForm = (initialFormValues) => {
    // initial state
    const [values, setValues] = useState(initialFormValues)

    return [
        values,
        (event) => {
            // updates state depending based on user input
            setValues({...values, [event.target.name]: event.target.value})
        }
    ];
}