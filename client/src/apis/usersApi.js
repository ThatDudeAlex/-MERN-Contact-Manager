// API library
import axios from "axios";

// logs user in & creates a session
export async function loginUser(userInfo, setErrors) {
  const response = await axios
    .post("http://localhost:5000/api/users/login", userInfo, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) setErrors(error.response.data);
    });

  return response;
}

// logs user out & destroys session
export async function logoutUser() {
  const response = await axios.get("http://localhost:5000/api/users/logout", {
    withCredentials: true,
  });

  return response.data;
}

// registers user info into DB
export async function registerUser(newUser, setErrors) {
  const response = await axios
    .post("http://localhost:5000/api/users/register", newUser, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) setErrors(error.response.data);
    });

  return response;
}

// checks to see if users is authenticated
export async function getAuthenticatedUser() {
  const response = await axios.get(
    "http://localhost:5000/api/users/getAuthenticatedUser",
    { withCredentials: true }
  )
  .then(res => res.data)
  .catch(error => {
    if(error.response) console.log(error.response.data)
  })

  return response;
}

// Sends a password recovery token to the users email
export async function passwordRecoveryEmail(userInfo, setErrors) {
  const response = await axios.post(
    "http://localhost:5000/api/users/passwordRecoveryEmail",
    userInfo,
    { withCredentials: true }
  )
  .then(res => res.data)
  .catch(error => {
    if(error.response) setErrors(error.response.data);
  })

  return response;
}

// Verifies if user entered the correct token
export async function verifyRecoveryCode(userInfo, setErrors) {
  const response = await axios.post(
    "http://localhost:5000/api/users/verifyRecoveryToken",
    userInfo,
    { withCredentials: true }
  )
  .then(res => res.data)
  .catch(error => {
    if(error.response) setErrors(error.response.data);
  })

  return response;
}

// Updates users account with new password
export async function recoverPassword(userInfo, setErrors) {
  const response = await axios.put(
    "http://localhost:5000/api/users/recoverPassword",
    userInfo,
    { withCredentials: true }
  )
  .then(res => res.data)
  .catch(error => {
    if(error.response) setErrors(error.response.data);
  })

  return response;
}
