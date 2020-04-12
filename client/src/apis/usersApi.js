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

  return response.data
}


export async function authStatus() {
  const response = await axios
      .get("http://localhost:5000/api/users/isAuthenticated", 
      {withCredentials: true})

  return response.data
}


// --------------- under construction
// export function logoutUser() {
//   return axios
//     .post("http://localhost:5000/api/users/logout", {
//       withCredentials: true,
//     })
//     .then((res) => {
//       if (res.data.success) return { success: true };
//       else return { success: false };
//     })
// }
