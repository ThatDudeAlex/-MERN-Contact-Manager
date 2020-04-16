import React from "react";
import { Route, Redirect } from "react-router-dom";

import { Consumer } from "../components/context";

export default function UnprotectedRoute({ component: Component, ...rest }) {
  return (
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
