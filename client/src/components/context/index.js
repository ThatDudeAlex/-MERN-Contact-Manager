import React, { createContext, useState, useEffect } from "react";
import {verifyUserAuth} from '../../apis/usersApi'

export const ContactManagerContext = createContext();

// const Provider = ContactManagerContext.Provider;
export const Provider = (props) => {
  // initial user authentication state
  const [isAuthenticated, setAuthentication] = useState(false);

  // on component mount
  useEffect(() => {
    onLoad();
  }, []);

  // gets & sets user authentication state on component render
  const onLoad = async () => {
    const auth = await verifyUserAuth();
    setAuthentication(auth.success);
  };

  const handleLogin = () => {
    setAuthentication(true);
  };

  return (
    <ContactManagerContext.Provider
      value={{
        isAuthenticated,
        actions: {
          handleLogin,
        },
      }}
    >
      {props.children}
    </ContactManagerContext.Provider>
  );
};

export const Consumer = ContactManagerContext.Consumer;

export default function withContext(Component){
    return function contextComponent(props){
        return (
            <ContactManagerContext.Consumer>
                {context => <Component {...props} context={context} />}
            </ContactManagerContext.Consumer>
        )
    }
}
