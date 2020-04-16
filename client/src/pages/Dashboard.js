import React, { useState, useEffect } from "react";

// Material-UI Components
import { Grid, CssBaseline } from "@material-ui/core";

// Components
import Header from "../components/dashboard/header/Header";
import Contacts from "../components/dashboard/contacts/Contacts";
import WithContext from "../components/context";

// API calls
import { getAllContacts } from "../apis/contactsApi";


// wraps header component in HOC containing global app state/functions
const HeaderWithContext = WithContext(Header);

export default function Dashboard() {
  // Initial state
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    // code to run on component mount
    onLoad();
  }, []);

  const onLoad = async () => {
    // API call to retrieve all user contacts
    const allContacts = await getAllContacts();

    if (allContacts.success)
      setUserContacts([...userContacts, ...allContacts.contacts]);
  };

  // adds new contact into state
  const handleAddContacts = (newContact) => {
    setUserContacts([...userContacts, newContact]);
  };

  // replaces a contact from state, with its updated version
  const handleUpdateContacts = (updatedContact) => {
    const updatedUserContacts = userContacts.map((contact) => {
      if (contact._id === updatedContact.contactId) return updatedContact;
      else return contact;
    });

    setUserContacts(updatedUserContacts);
  };

  // removes a contact from state
  const handleDeleteContacts = (contactId) => {
    setUserContacts(
      userContacts.filter((contact) => {
        return contact._id !== contactId;
      })
    );
  };

  // ---------- under construction ----------------------
  // filters contacts by name, phone number or email
  // const handleFilterContacts = (name) => {
  //   setSearchString(name)

  //   const filterContacts = userContacts.filter((contact) => {
  //     return (
  //       contact.name.toLowerCase().includes(name) ||
  //       contact.phoneNumber.toLowerCase().includes(name) ||
  //       contact.email.toLowerCase().includes(name)
  //     );
  //   });

  //   setSearchedContacts(filterContacts);
  // };

  return (
    <Grid container component="main">
      <CssBaseline />
      <HeaderWithContext handleAddContacts={handleAddContacts} />
      <Contacts
        userContacts={userContacts}
        handleUpdateContacts={handleUpdateContacts}
        handleDeleteContacts={handleDeleteContacts}
      />
    </Grid>
  );
}
