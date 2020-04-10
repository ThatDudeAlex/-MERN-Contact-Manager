// API library
import axios from "axios";

/*
 
*/
export function loginUser(userInfo) {
  return axios
    .put("http://localhost:5000/api/users/login", userInfo, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.success) return { success: true };
      else return { success: false };
    })
    .catch((err) => console.log(err));
}

/*
 
*/
export function logoutUser() {
  return axios
    .put("http://localhost:5000/api/users/logout", {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.success)
      if (res.data.success) return { success: true };
      else return { success: false };
    })
    .catch((err) => console.log(err));
}

/*
 
*/
export function registerUser(newUser) {
  return axios
    .post("http://localhost:5000/api/users/register", newUser, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data)
      if (res.data.success) return { success: true, msg: "New User Added" };
      return { success: false, msg: res.data.msg };
    })
    .catch((err) => {
      return { success: false, msg: err };
    });
}

export function isLoggedIn() {
  return axios
    .get("http://localhost:5000/api/users/isLoggedIn", {
      withCredentials: true,
    })
    .then((res) => {
      console.log('====>', res.data)
      if (res.data.success) return { success: true, msg: res.data.msg };
      
      return { success: false, msg: res.data.msg };
    })
    .catch((err) => {
      return { success: false, msg: err };
    });
}
