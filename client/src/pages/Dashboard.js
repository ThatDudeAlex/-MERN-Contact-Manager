import React, { useState, useEffect } from "react";

// API library
import axios from "axios";

// Material-UI Components
import { Grid, CssBaseline } from "@material-ui/core";

// Components
import Header from "../components/dashboard/header/Header";
import Contacts from "../components/dashboard/contacts/Contacts";
import Modal from "../components/dashboard/modal/Modal";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    // code to run on component mount
    getAllUserContacts();
  }, []);

  const getAllUserContacts = () => {
    axios
      .get("http://localhost:5000/api/contacts/getAllContacts", {
        withCredentials: true
      })
      .then((res) => {
        const allContacts = res.data;

        setUserContacts([...userContacts, ...allContacts]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleAddContacts = (newContact) => {
    setUserContacts([...userContacts, newContact]);
  };

  const handleDeleteContacts = (contactId) => {
    setUserContacts(userContacts.filter(contact => { 
      return contact._id !== contactId
    }));
  };

  const toggleModal = () => {
    setModal(!modal);
    console.log(userContacts);
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Header openModal={toggleModal} />
      <Contacts
        userContacts={userContacts}
        addContact={handleAddContacts}
        deleteContact={handleDeleteContacts}
      />
      <Modal
        addContact={handleAddContacts}
        modalState={modal}
        closeModal={toggleModal}
      />
    </Grid>
  );
}
