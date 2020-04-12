import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";

import {authStatus} from './apis/usersApi'

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import UnprotectedRoute from "./routes/UnprotectedRoute";


function App() {
  // initial user authentication state
  const [isAuthenticated, setAuthentication] = useState(false)

  // on component mount
  useEffect(() => {
      onLoad()
  }, [])

  // gets & sets user authentication state on component render
  const onLoad = async() => {
    try {
      const auth = await authStatus()
      setAuthentication(auth.success)
    } catch (error) {
      alert(error)
    }
  }

  // logs user in 
  const handleLogin = () => {
    setAuthentication(true)
  }

  // const userLoggedOut = () => {
  //   setAuthentication(false)
  // }
 

  return (
    <BrowserRouter>
      <UnprotectedRoute exact path='/' component={Home} isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
      <ProtectedRoute path="/dashboard" isAuthenticated={isAuthenticated} component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
