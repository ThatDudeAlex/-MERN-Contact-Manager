import React from "react";
import { Route, Redirect } from "react-router-dom";

// Components
import { Consumer } from "../components/context";

// Routes that are available for users not logged in
// If user is not logged in, display protected page else redirect to '/dashboard'
export default function UnprotectedRoute({ component: Component, ...rest }) {
  return (
    // consumer allows us to see the app state from context
    <Consumer>
      {({ isAuthenticated }) => (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Component {...props} />;
            } else return <Redirect to="/dashboard" />;
          }}
        />
      )}
    </Consumer>
  );
}
