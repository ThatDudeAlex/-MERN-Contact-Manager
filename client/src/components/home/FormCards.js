import React, { useState } from "react";

// Components
import SignUp from "./Forms/SignUp";
import SignIn from "./Forms/SignIn";
import withContext from "../context"

export default function HomeCard() {
  const SignInWithContext = withContext(SignIn);
  const SignUpWithContext = withContext(SignUp);
  const [viewForm, toggleView] = useState(true);

  const handleFormType = () => {
    toggleView(!viewForm);
  };

  const getFormType = () => {
    if(viewForm)
      return <SignInWithContext handleFormType={handleFormType} />
    else
      return <SignUpWithContext handleFormType={handleFormType} />
  }

  return (
    <div>
      {getFormType()}
    </div>
  );
}
