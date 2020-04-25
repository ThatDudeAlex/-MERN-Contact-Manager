// API library
import axios from "axios";

// Creates a new contact for the user
export async function addContact(newContact, setErrors) {
  const response = await axios
      .post("http://localhost:5000/api/contacts/addContact", newContact, 
      {withCredentials: true})
      .then(res => res.data)
      .catch(error => {
        if(error.response) setErrors(error.response.data)
      })

  return response
}


// Changes info from an existing contact
export async function editContact(updatedContact, setErrors) {
  const response = await axios
      .patch("http://localhost:5000/api/contacts/editContact", updatedContact,
      {withCredentials: true})
      .then(res => res.data)
      .catch(error => {
        if(error.response) setErrors(error.response.data)
      })

  return response
}


// Completely deletes all contact info 
export async function deleteContact(_id) {
  const response = await axios
      .delete(`http://localhost:5000/api/contacts/deleteContact/${_id}`, 
       { withCredentials: true })
      .catch(error => {
        if(error.response) console.log(error.response)
      })
  
  return response.data
}


// Gets all contacts for the specified user
export async function getAllContacts() {
  const response = await axios
      .get("http://localhost:5000/api/contacts/getAllContacts", 
      { withCredentials: true })
      .then(res => res.data)
      .catch(error => {
        if(error.response) console.log(error.response.data)
      })

  return response
}
