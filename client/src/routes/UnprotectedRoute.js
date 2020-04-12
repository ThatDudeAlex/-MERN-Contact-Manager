import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function UnprotectedRoute({isAuthenticated ,component: Component, handleLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated){
          return <Component {...props} handleLogin={handleLogin} />
        } 
        else return <Redirect to="/dashboard" />;
      }}
    />
  );
}
