// API library
import axios from "axios";

/*
  Creates a new contact for the user
*/
export async function addContact(newContact) {
  const response = await axios
      .post("http://localhost:5000/api/contacts/addContact", newContact, 
      {withCredentials: true})

  return response.data
}

/*
  Changes info from an existing contact
*/
export async function editContact(updatedContact) {
  const response = await axios
      .patch("http://localhost:5000/api/contacts/editContact", updatedContact,
      {withCredentials: true})

  return response.data
}

/*
  Completely deletes all contact info
*/
export async function deleteContact(contactId) {
  const response = await axios
      .delete("http://localhost:5000/api/contacts/deleteContact", 
      {data: { contactId }}, { withCredentials: true })
  
  return response.data
}

/*
  Gets all contacts for the specified user
*/
export async function getAllContacts() {
  const response = await axios
      .get("http://localhost:5000/api/contacts/getAllContacts", 
      { withCredentials: true })

  return response.data
}
