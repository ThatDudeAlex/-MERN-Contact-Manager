import {useState} from 'react'

// hook that handles form states
export const useForm = (initialFormValues) => {
    // initial state
    const [values, setValues] = useState(initialFormValues)

    // formats phone number input to (###) ###-###
    const formatPhoneNumber = (target) => {
        const input = target.value.replace(/\D/g,'').substring(0,10)
        const zip = input.substring(0,3)
        const middle = input.substring(3,6)
        const last = input.substring(6,10)

        if(input.length > 6) target.value = `(${zip}) ${middle}-${last}`
        else if(input.length > 3) target.value = `(${zip}) ${middle}`
        else if(input.length > 0) target.value = `${zip}`
        else target.value = input
    }

    return [
        values,
        (event) => {
            if(event.target.name === 'phoneNumber') formatPhoneNumber(event.target)
            
            // updates state depending based on user input
            setValues({...values, [event.target.name]: event.target.value})
        }
    ];
}