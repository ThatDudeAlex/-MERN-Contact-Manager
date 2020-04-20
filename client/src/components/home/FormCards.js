import React, { useState } from "react";

// Custom Components
import SignUp from "./Forms/SignUp";
import SignIn from "./Forms/SignIn";
import PasswordRecovery from "./Forms/PasswordRecovery";
import withContext from "../context";

// wraps signIn & signUp components in HOC containing global app state/functions
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);

// component that controls which from to display signUp or signIn
export default function HomeCard() {
  const [viewForm, toggleView] = useState(true);
  const [viewRecovery, toggleRecovery] = useState(false);

  // updates viewForm state
  const handleStandardForms = () => {
    toggleView(!viewForm);
  };

  const handleRecoveryForm = () => {
    toggleRecovery(!viewRecovery);
    toggleView(true);
  };

  // toggles between signUp or signIn forms
  const getFormType = () => {
    if (viewRecovery)
      return <PasswordRecovery handleRecoveryForm={handleRecoveryForm} />;

    else if (viewForm && !viewRecovery)
      return (
        <SignInWithContext
          handleStandardForms={handleStandardForms}
          handleRecoveryForm={handleRecoveryForm}
        />
      );
    
    else if (!viewForm && !viewRecovery)
      return <SignUpWithContext handleStandardForms={handleStandardForms} />;
  };

  return <div>{getFormType()}</div>;
}
