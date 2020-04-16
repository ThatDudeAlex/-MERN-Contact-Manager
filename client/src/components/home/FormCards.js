import React, { useState } from "react";

// Components
import SignUp from "./Forms/SignUp";
import SignIn from "./Forms/SignIn";
import withContext from "../context"

// wraps signIn & signUp components in HOC containing global app state/functions
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);

// component that controls which from to display signUp or signIn
export default function HomeCard() {
  const [viewForm, toggleView] = useState(true);

  // updates viewForm state
  const handleFormType = () => {
    toggleView(!viewForm);
  };

  // toggles between signUp or signIn forms
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
