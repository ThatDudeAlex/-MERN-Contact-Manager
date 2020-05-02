// API library
import axios from "axios";

// logs user in & creates a session
export async function loginUser(userInfo, setErrors) {
  try {
    const {data} = await axios.post("http://localhost:5000/api/users/login", userInfo, { withCredentials: true })
    return data
  } catch (error) {
    setErrors(error.response.data)
  }
}

// logs user out & destroys session
export async function logoutUser() {
  try {
    await axios.get("http://localhost:5000/api/users/logout", {withCredentials: true})
  } catch (error) {
    alert(error.response.data)
  }
}

// registers user info into DB
export async function registerUser(newUser, setErrors) {
  try {
    const {data} = await axios.post("http://localhost:5000/api/users/register", newUser, { withCredentials: true })
    return data
  } catch (error) {
    setErrors(error.response.data)
  }
}

// checks to see if users is authenticated
export async function getAuthenticatedUser() {
  try {
    const {data} =  await axios.get("http://localhost:5000/api/users/getAuthenticatedUser", { withCredentials: true })
    return data
  } catch (error) {
    console.log(error.response.data)
  }
}

// Sends a password recovery token to the users email
export async function passwordRecoveryEmail(userInfo, setErrors) {
  try {
    const {data} = await axios.post("http://localhost:5000/api/users/passwordRecoveryEmail", userInfo,{ withCredentials: true })
    return data
  } catch (error) {
    setErrors(error.response.data)
  }
}

// Verifies if user entered the correct token
export async function verifyRecoveryCode(userInfo, setErrors) {
  try {
    const {data} = await axios.post("http://localhost:5000/api/users/verifyRecoveryToken", userInfo, { withCredentials: true })
    return data
  } catch (error) {
    setErrors(error.response.data)
  }
}

// Updates users account with new password
export async function recoverPassword(userInfo, setErrors) {
  try {
    const {data} = await axios.put("http://localhost:5000/api/users/recoverPassword", userInfo, { withCredentials: true })
    return data
  } catch (error) {
    setErrors(error.response.data)
  }
}
