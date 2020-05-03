// API library
import axios from "axios";

// ----- try/catch wrapper under construction -----
// wraps incoming functions inside an async function with try catch methods
// const asyncHandler = (incomingFunction) => {
//   return async() => {
//     try {
//       await incomingFunction();
//     } catch (error) {
//       console.log(error)
//     }
//   };
// };

const s3UploadCall = async(file, options) => {
  const {data: {putURL, headers}} = await axios.get("http://localhost:5000/api/aws/generate-put-url", options)
  return axios.put(putURL, file, headers)
}

const s3GetCall = async(options) => {
  return axios.get("http://localhost:5000/api/aws/generate-get-url", options)
}

const getAllCall = async() => {
  return axios.get("http://localhost:5000/api/contacts/getAllContacts", {withCredentials: true})
}

const addCall = async(newContact) => {
  return axios.post("http://localhost:5000/api/contacts/addContact", newContact, {withCredentials: true})
}

const editCall = async(updatedContact) => {
  return axios.patch("http://localhost:5000/api/contacts/editContact", updatedContact, {withCredentials: true})
}

const deleteCall = async(_id) => {
  return axios.delete(`http://localhost:5000/api/contacts/deleteContact/${_id}`, { withCredentials: true })
}

// Creates a new contact for the user
export async function addContact(newContact, file, options, setErrors) {
  try {
    if(file){
      const [s3, contact] = await axios.all([s3UploadCall(file, options), addCall(newContact)])
      return contact.data
    }else{
      const {data} = await addCall(newContact)
      return data
    }
  } catch (error) {
    if(error.response.data.errors) setErrors(error.response.data.errors)
    else console.log(error.response.data)
  }
}


// Changes info from an existing contact
export async function editContact(updatedContact, file, options, setErrors) {
  try {
    if (file){
      const [s3, contact] = await axios.all([s3UploadCall(file, options), editCall(updatedContact)])
      return contact.data
    }
    else return await editCall(updatedContact)
  } catch (error) {
    if(error.response.data.errors) setErrors(error.response.data.errors)
    else console.log(error.response.data)
  }
}


// Completely deletes all contact info 
export async function deleteContact(_id) {
  try {
    return await deleteCall(_id)
  } catch (error) {
    console.log(error.response.data)
  }
}


// Gets all contacts for the specified user
export async function getAllContacts() {
  try {
    const {data} = await getAllCall()
    return data
  } catch (error) {
    console.log(error.response.data)
  }
}


export async function getUrl(options) {
  try {
    const {data} = await s3GetCall(options)
    return data
  } catch (error) {
    console.log(error.response.data)
  }
}
