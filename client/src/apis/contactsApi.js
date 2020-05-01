// API library
import axios from "axios";

// Creates a new contact for the user
export async function addContact(newContact, file, options, setErrors) {
  const response = await axios
      .post("http://localhost:5000/api/contacts/addContact", newContact, 
      {withCredentials: true})
      .then(async(res) => {

        const addedContact = res.data
        console.log(addedContact)
        if(addedContact.avatarKey){
          // const options = {
          //   params: {
          //     Key: addedContact.avatarKey,
          //     ContentType: imgInfo.contentType
          //   },
          //   headers: {
          //     'Content-Type': imgInfo.contentType
          //   }
          // }
          await axios.get("http://localhost:5000/api/aws/generate-put-url", options)
          .then(async(res) => {
            const {putURL, headers} = res.data
            await axios.put(putURL, file, headers).then(res => console.log(res))
          })
          .catch(err => console.log(err))
          return addedContact
        }
        else
          return res.data
        
        
        // console.log(imgInfo)
        // return res.data
      })
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

export async function imgUpload(data) {
  const response = await axios
      .post("http://localhost:5000/api/aws/profile-img-upload", data, 
      { withCredentials: true, headers: {'accept': 'application/json',
     'Accept-Language': 'en-US,en;q=0.8','Content-Type': `multipart/form-data; boundary=${data._boundary}`} })
      .then(res => res.data)
      .catch(error => {
        if(error.response) console.log(error.response.data)
      })

  return response
}

// export async function putUrl(url, file, options) {
//   // console.log('<===')
//   const response = await axios
//       .put(url, file, options, { withCredentials: true })
//       .then(res => res.data)
//       .catch(error => {
//         if(error.response) console.log(error.response.data)
//       })

//   return response
// }

export async function getUrl(options) {
  const response = await axios
      .get("http://localhost:5000/api/aws/generate-get-url", options)
      .then(res => res.data)
      .catch(error => {
        if(error.response) console.log(error.response.data)
      })

  return response
}

export async function putUrl(file, options) {
  const response = await axios
      .get("http://localhost:5000/api/aws/generate-put-url", options)
      .then(res => {
        const {putURL, headers} = res.data

        axios.put(putURL, file, headers)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      })
      .catch(error => {
        if(error.response) console.log(error.response.data)
      })

  return response
}


