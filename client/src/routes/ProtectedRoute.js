import React  from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({isAuthenticated ,component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated){
          return <Component {...props} />
        } 
        else return <Redirect to="/" />;
      }}
    />
  );
}
