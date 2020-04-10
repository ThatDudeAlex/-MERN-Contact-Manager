import React, { useState } from "react";

// Components
import SignUp from "./Forms/SignUp";
import SignIn from "./Forms/SignIn";

export default function HomeCard() {
  const [viewForm, toggleView] = useState(true);

  const handleFormType = () => {
    toggleView(!viewForm);
  };

  const getFormType = () => {
    if(viewForm)
      return <SignIn handleFormType={handleFormType} />
    else
      return <SignUp handleFormType={handleFormType} />
  }

  return (
    <div>
      {getFormType()}
    </div>
  );
}
