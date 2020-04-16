import React, { createContext, useState, useEffect } from "react";

// Components
import {verifyUserAuth} from '../../apis/usersApi'

// App global Context 
export const ContactManagerContext = createContext();

// Global context provider, provides context to all child components 
export const Provider = (props) => {
  // initial user authentication state
  const [isAuthenticated, setAuthentication] = useState(false);

  useEffect(() => {
    // code to run on-mount 
    onLoad();
  }, []);

  // gets & sets user authentication state on component render
  const onLoad = async () => {
    const auth = await verifyUserAuth();
    setAuthentication(auth.success);
  };

  // updates user state when logged in successfully
  const handleLogin = () => {
    setAuthentication(true);
  };

  // updates user state when logged out successfully
  const handleLogout = () => {
    setAuthentication(false);
  };

  return (
    <ContactManagerContext.Provider
      value={{
        isAuthenticated,
        actions: {
          handleLogin,
          handleLogout
        },
      }}
    >
      {props.children}
    </ContactManagerContext.Provider>
  );
};

// Global context consumer
export const Consumer = ContactManagerContext.Consumer;

// wraps a component and provides context to it 
export default function withContext(Component){
    return function contextComponent(props){
        return (
            <ContactManagerContext.Consumer>
                {context => <Component {...props} context={context} />}
            </ContactManagerContext.Consumer>
        )
    }
}
