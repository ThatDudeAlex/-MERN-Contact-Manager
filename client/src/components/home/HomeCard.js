import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function HomeCard() {
  const [viewForm, toggleView] = useState(true);

  const toggleForm = () => {
    toggleView(!viewForm);
  };

  return (
    <div>
      {viewForm === true ? (
        <SignIn toggle={toggleForm} />
      ) : (
        <SignUp toggle={toggleForm} />
      )}
    </div>
  );
}
