import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../components/context";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
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
