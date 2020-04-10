import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import { isLoggedIn } from "../apis/usersApi";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setAuthentication] = useState(false);
  
  useEffect(() => {
    // if(isAuthenticated)
    //   return <Route render={(props) => <Component {...props} />} />
    // getUserAuthentication();
    isLoggedIn().then((res) => setAuthentication(res.success));
  }, []);

  const getUserAuthentication = () => {
    // isLoggedIn().then((res) => setAuthentication(res.success));

    // if (isAuthenticated) history.push("/dashboard");
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated){
          console.log(isAuthenticated)
          return <Component {...props} />
        } 
        else return <Redirect to="/" />;
      }}
    />
  );
}
