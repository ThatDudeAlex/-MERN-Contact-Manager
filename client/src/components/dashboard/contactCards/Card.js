import React, { useState } from "react";

// API library
import axios from "axios";

// Material-UI Components
import {
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  Avatar,
} from "@material-ui/core";

import {
  HeaderName,
  HeaderUpload,
  BodyDisplay,
  BodyChange,
  FooterDisplay,
  FooterChange,
} from "./config";

// Icons
import { AccountCircle } from "@material-ui/icons";

// Styles
import { useStyles } from "./styles";

export default function Cards(props) {
  const classes = useStyles();

  const cardType = props.cardType;
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const {
    name,
    phone,
    email,
    contactId,
    handleAddContacts,
    handleDeleteContacts,
    closeModal,
  } = props;

  //   console.log(props)

  //   const bodyDisplay = {name: props.name, phone: props.phone, email: props.email}
  //   const footerDisplay = {deleteContact: props.deleteContact};

  const handleContactInfo = (event) => {
    const { name, value } = event.target;
    setContactInfo({ ...contactInfo, [name]: value });
    console.log(contactInfo);
  };

  //   const footerChange = {addContact: props.addContact, closeModal: props.closeModal};
  //   const handleAddContacts = props.handleAddContacts

  const addContact = (event) => {
    event.preventDefault();

    const { name, email, phoneNumber } = contactInfo;
    const newContact = { name, email, phoneNumber };

    axios
      .post("http://localhost:5000/api/contacts/addContact", newContact, {
        withCredentials: true,
      })
      .then((res) => {
        handleAddContacts(res.data.newContact);
        closeModal();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteContact = () => {
    axios
      .delete(
        "http://localhost:5000/api/contacts/deleteContact",
        { data: { contactId } },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) handleDeleteContacts(contactId);
      });
  };

  const getHeader = () => {
    if (cardType === "display") {
      return <HeaderName name={name} />;
    } else if (cardType === "change") {
      return <HeaderUpload />;
    }
  };

  const getBody = () => {
    if (cardType === "display") {
      return <BodyDisplay name={name} email={email} phone={phone} />;
    } else if (cardType === "change") {
      return <BodyChange handleContactInfo={handleContactInfo} />;
    }
  };

  const getFooter = () => {
    if (cardType === "display") {
      return <FooterDisplay deleteContact={deleteContact} />;
    } else if (cardType === "change") {
      return <FooterChange addContact={addContact} closeModal={closeModal} />;
    }
  };

  return (
    <Card className={classes.card}>
      {/* Card Header */}
      <List>
        {/* Contact Avatar */}
        <ListItem className={classes.cardHeaderItem}>
          <input
            // onChange={handleImgSelection}
            style={{ display: "none" }}
            id="contained-button-file"
            accept="image/*"
            className={classes.input}
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Avatar className={classes.cardAvatar}>
              <AccountCircle className={classes.cardAvatarIcon} />
            </Avatar>
          </label>
        </ListItem>

        {getHeader()}
      </List>

      {/* Displays Contact Info */}
      <CardContent className={classes.cardContent}>{getBody()}</CardContent>

      {/* Draws line to create the footer */}
      <Divider variant="middle" />

      {/* Edit/Delete/Save/Cancel Actions */}
      {getFooter()}
    </Card>
  );
}
