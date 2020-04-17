// API library
import axios from "axios";

// logs user in & creates a session
export async function loginUser(userInfo) {
  const response = await axios
      .post("http://localhost:5000/api/users/login", userInfo, 
      {withCredentials: true})

  return response.data
}


// registers user info into DB
export async function registerUser(newUser) {
  const response = await axios
      .post("http://localhost:5000/api/users/register", newUser,
      {withCredentials: true})
      .catch(err => console.log(err))
  console.log(response)
  return response.data
}


export async function verifyUserAuth() {
  const response = await axios
      .get("http://localhost:5000/api/users/isAuthenticated", 
      {withCredentials: true})

  return response.data
}


// 
export async function logoutUser() {
  const response = await axios
      .get("http://localhost:5000/api/users/logout", 
      {withCredentials: true})

    return response.data
}