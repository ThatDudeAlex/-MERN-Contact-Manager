// API library
import axios from "axios";

/*
  Creates a new contact for the user
*/
export function addContact(newContact) {
  return axios
    .post("http://localhost:5000/api/contacts/addContact", newContact, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.success)
        return { success: true, newContact: res.data.newContact };
      return {success: false, msg: 'error adding'}
    })
    .catch((err) => {
      return {success: false, msg: err}
    });
}

/*
  Changes info from an existing contact
*/
export function editContact(updatedContact) {
  return axios
    .patch("http://localhost:5000/api/contacts/editContact", updatedContact, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.success) return { success: true };

      return {success: false, msg: 'error editing'}
    })
    .catch((err) => { return {success: false, msg: err}});
}

/*
  Completely deletes all contact info
*/
export function deleteContact(contactId) {
  return axios
    .delete(
      "http://localhost:5000/api/contacts/deleteContact",
      { data: { contactId } },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data.success) return { success: true };

      return {success: false, msg: 'error deleting'}
    })
    .catch((err) =>{return {success: false, msg: err}})
}

/*
  Gets all contacts for the specified user
*/
export function getAllContacts() {
  return axios
    .get("http://localhost:5000/api/contacts/getAllContacts", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.success) return { success: true, contacts: res.data.contacts };
      return {success: false, msg: 'error getting contacts'}
    })
    .catch((err) => {return {success: false, msg: err}});
}
