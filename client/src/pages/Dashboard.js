import React, { useState, useEffect } from "react";

// Material-UI Components
import { Grid, CssBaseline } from "@material-ui/core";

// Custom Components
import Header from "../components/dashboard/header/Header";
import Contacts from "../components/dashboard/contacts/Contacts";
import WithContext from "../components/context";

// API calls
import { getAllContacts } from "../apis/contactsApi";

// wraps header component in HOC containing global app state/functions
const HeaderWithContext = WithContext(Header);

export default function Dashboard() {
  // Stores user contacts
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    // code to run on component mount
    onLoad();
  }, []);

  const onLoad = async () => {
    // API call to retrieve all user contacts
    const allContacts = await getAllContacts();

    if (allContacts){
      setUserContacts([...userContacts, ...allContacts]);
    }
  };

  // adds new contact into state
  const handleAddContacts = (newContact) => {
    setUserContacts([...userContacts, newContact]);
  };

  // replaces a contact from state, with its updated version
  const handleUpdateContacts = (updatedContact) => {

    const updatedUserContacts = userContacts.map((contact) => {
      if (contact._id === updatedContact._id) return updatedContact;
      else return contact;
    });
    // console.log(updatedContact)
    setUserContacts(updatedUserContacts);
  };

  // removes a contact from state
  const handleDeleteContacts = (_id) => {
    setUserContacts(userContacts.filter((contact) => {
      return contact._id !== _id;
    }))
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <HeaderWithContext />

      <Contacts
        userContacts={userContacts}
        handleAddContacts={handleAddContacts} 
        handleUpdateContacts={handleUpdateContacts}
        handleDeleteContacts={handleDeleteContacts}
      />
    </Grid>
  );
}
