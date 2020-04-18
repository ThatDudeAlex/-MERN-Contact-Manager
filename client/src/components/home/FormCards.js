import React, { useState } from "react";

// Components
import SignUp from "./Forms/SignUp";
import SignIn from "./Forms/SignIn";
import PasswordRecovery from "./Forms/PasswordRecovery"
import withContext from "../context"

// wraps signIn & signUp components in HOC containing global app state/functions
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);

// component that controls which from to display signUp or signIn
export default function HomeCard() {
  const [viewForm, toggleView] = useState(true);
  const [viewRecovery, toggleRecovery] = useState(false);


  // updates viewForm state
  const handleFormType = () => {
    toggleView(!viewForm);
  };

  const handlePasswordRecovery = () => {
    toggleRecovery(!viewRecovery)
    toggleView(true)
  }

  // toggles between signUp or signIn forms
  const getFormType = () => {
    if (viewRecovery)
      return <PasswordRecovery handlePasswordRecovery={handlePasswordRecovery} />
    else if (viewForm && !viewRecovery)
      return <SignInWithContext handleFormType={handleFormType} handlePasswordRecovery={handlePasswordRecovery} />
    else if (!viewForm && !viewRecovery)
      return <SignUpWithContext handleFormType={handleFormType} />
  }

  return (
    <div>
      {getFormType()}
    </div>
  );
}
