// API library
import axios from "axios";

export function addContact(newContact) {
  return axios
    .post("http://localhost:5000/api/contacts/addContact", newContact, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.success)
        return { success: true, newContact: res.data.newContact };
    })
    .catch((err) => {
      console.log(err);
    });
}

export function editContact(updatedContact) {
  return axios
    .patch("http://localhost:5000/api/contacts/editContact", updatedContact, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.success) return { success: true };
    })
    .catch((err) => console.log(err));
}

export function deleteContact(contactId) {
  return axios
    .delete(
      "http://localhost:5000/api/contacts/deleteContact",
      { data: { contactId } },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data.success) return { success: true };
    });
}

export function getAllContacts() {
  return axios
    .get("http://localhost:5000/api/contacts/getAllContacts", {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
