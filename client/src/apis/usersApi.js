// API library
import axios from "axios";

// logs user in & creates a session
export async function loginUser(userInfo) {
  const response = await axios
      .post("http://localhost:5000/api/users/login", userInfo, 
      {withCredentials: true})

  return response.data
}

// logs user out & destroys session
export async function logoutUser() {
  const response = await axios
      .get("http://localhost:5000/api/users/logout", 
      {withCredentials: true})

    return response.data
}


// registers user info into DB
export async function registerUser(newUser) {
  const response = await axios
      .post("http://localhost:5000/api/users/register", newUser,
      {withCredentials: true})
      
  return response.data
}


// checks to see if users is authenticated
export async function verifyUserAuth() {
  const response = await axios
      .get("http://localhost:5000/api/users/isAuthenticated", 
      {withCredentials: true})

  return response.data
}


// Sends a password recovery token to the users email
export async function passwordRecoveryEmail(userInfo){
  const response = await axios
  .post("http://localhost:5000/api/users/passwordRecoveryEmail", userInfo,
  {withCredentials: true})

  return response.data
}


// Verifies if user entered the correct token
export async function verifyRecoveryCode(userInfo){
  const response = await axios
  .post("http://localhost:5000/api/users/verifyRecoveryToken", userInfo,
  {withCredentials: true})

  return response.data
}


// Updates users account with new password
export async function recoverPassword(userInfo){
  const response = await axios
  .put("http://localhost:5000/api/users/recoverPassword", userInfo,
  {withCredentials: true})

  return response.data
}



