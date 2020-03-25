import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function HomeCard() {
  const [viewForm, toggleView] = useState(true);
  const history = useHistory();
  // const [login, logUser] = useState(false);

  const toggleForm = () => {
    toggleView(!viewForm);
  };

  const handleLogin = () => {
    history.push(`/dashboard`)
  };

  return (
    <div>
      {viewForm === true ? (
        <SignIn toggle={toggleForm} login={handleLogin}/>
      ) : (
        <SignUp toggle={toggleForm} login={handleLogin} />
      )}
    </div>
  );
}
