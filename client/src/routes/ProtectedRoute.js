import React from "react";
import { Route, Redirect } from "react-router-dom";

// Custom Components
import { Consumer } from "../components/context";

// Routes that requires a logged in user to display
// If user is logged in, display protected page else redirect to '/'
export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    // consumer allows us to see the app state from context
    <Consumer>
      {({ isAuthenticated }) => (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated) {
              return <Component {...props} />;
            } else return <Redirect to="/" />;
          }}
        />
      )}
    </Consumer>
  );
}
