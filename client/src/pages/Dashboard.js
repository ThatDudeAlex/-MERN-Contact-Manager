import React, { useState, useEffect } from "react";

// Material-UI Components
import { Grid, CssBaseline } from "@material-ui/core";

// Components
import Header from "../components/dashboard/header/Header";
import Contacts from "../components/dashboard/contacts/Contacts";

// API calls
import { getAllContacts } from "../apis/contactsApi";

export default function Dashboard() {
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    // code to run on component mount
    onLoad()
  }, []);

  const onLoad = async() => {
    try {
      const allContacts = await getAllContacts();

      if(allContacts.success)
        setUserContacts([...userContacts, ...allContacts.contacts]);
    } catch (error) {
      alert(error)
    }
    
    
  };

  const handleAddContacts = (newContact) => {
    setUserContacts([...userContacts, newContact]);
  };

  const handleUpdateContacts = (updatedContact) => {
    const updatedUserContacts = userContacts.map((contact) => {
      if (contact._id === updatedContact.contactId) return updatedContact;
      else return contact;
    });

    setUserContacts(updatedUserContacts);
  };

  const handleDeleteContacts = (contactId) => {
    setUserContacts(
      userContacts.filter((contact) => {
        return contact._id !== contactId;
      })
    );
  };

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
      <Header handleAddContacts={handleAddContacts} />
      <Contacts
        userContacts={userContacts}
        handleUpdateContacts={handleUpdateContacts}
        handleDeleteContacts={handleDeleteContacts}
      />
    </Grid>
  );
}
