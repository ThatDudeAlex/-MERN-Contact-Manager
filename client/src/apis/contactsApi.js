// API library
import axios from "axios";

// Creates a new contact for the user
export async function addContact(newContact, file, options, setErrors) {
  try {
    const s3Promise = async() => {
      const {data: {putURL, headers}} = await axios.get("http://localhost:5000/api/aws/generate-put-url", options)
      axios.put(putURL, file, headers).catch(err => console.log(err))
    }

    const contactPromise = () => {
      return axios.post("http://localhost:5000/api/contacts/addContact", newContact, {withCredentials: true})
    }
    
    if(file){
      const [s3, contact] = await axios.all([s3Promise(), contactPromise()])
      return contact.data
    }else{
      const {data} = await contactPromise()
      return data
    }
  } catch (error) {
    setErrors(error.response.data)
  }
}


// Changes info from an existing contact
export async function editContact(updatedContact, setErrors) {
  try {
    return await axios.patch("http://localhost:5000/api/contacts/editContact", updatedContact, {withCredentials: true})
  } catch (error) {
    setErrors(error.response.data)
  }
}


// Completely deletes all contact info 
export async function deleteContact(_id) {
  try {
    return await axios.delete(`http://localhost:5000/api/contacts/deleteContact/${_id}`, { withCredentials: true })
  } catch (error) {
    console.log(error.response)
  }
}


// Gets all contacts for the specified user
export async function getAllContacts() {
  try {
    const {data} = await axios.get("http://localhost:5000/api/contacts/getAllContacts", {withCredentials: true})
    return data
  } catch (error) {
    console.log(error.response)
  }
}


export async function getUrl(options) {
  try {
    const {data} = await axios.get("http://localhost:5000/api/aws/generate-get-url", options)
    return data
  } catch (error) {
    console.log(error.response.data)
  }
}
