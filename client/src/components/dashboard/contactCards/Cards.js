import React from "react";

// Material-UI Components
import { Card } from "@material-ui/core";

// Components
import { ContactInfoCard, NewContanctCard, EditContactCard } from "./config";

// Styles
import { useStyles } from "./styles";

export default function Cards(props) {
  const classes = useStyles();

  const {
    infoCard,
    addCard,
    editCard,
    contactId,
    name,
    email,
    phone,
    handleModal,
    handleUpdateContacts,
    handleAddContacts,
    handleDeleteContacts,
  } = props;
  let cardType = null;

  const contactData = {
    contactId,
    name,
    email,
    phone,
    handleUpdateContacts,
    handleDeleteContacts,
  };
  const editContact = { ...contactData, ...props };
  const newContact = { handleAddContacts, handleModal };

  if (infoCard) cardType = ContactInfoCard({ ...contactData });
  else if (addCard) cardType = NewContanctCard(newContact);
  else if (editCard) cardType = EditContactCard(editContact);

  return <Card className={classes.card}>{cardType}</Card>;
}
