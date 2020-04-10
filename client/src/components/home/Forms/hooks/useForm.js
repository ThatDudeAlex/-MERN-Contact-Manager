import {useState} from 'react'

export const useForm = (initialFormValues) => {
    const [values, setValues] = useState(initialFormValues)

    return [
        values,
        (event) => {
            setValues({...values, [event.target.name]: event.target.value})
        }
    ];
}