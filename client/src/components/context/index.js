import React, { createContext, useState, useEffect } from "react";

// Custom Components
import {getAuthenticatedUser} from '../../apis/usersApi'

// App global Context 
export const ContactManagerContext = createContext();

// Global context provider, provides context to all child components 
export const Provider = (props) => {
  // initial user authentication state
  const [isAuthenticated, setAuthentication] = useState(null);

  useEffect(() => {
    // code to run on-mount 
    onLoad();
  },[]);

  // gets & sets user authentication state on component render
  const onLoad = async () => {
    const user = await getAuthenticatedUser();
    if(user){
      setAuthentication(user);
    }
  };

  // updates user state when logged in successfully
  const handleLogin = (user) => {
    setAuthentication(user);
  };

  // updates userAuth state when logged out successfully
  const handleLogout = () => {
    setAuthentication(null);
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
