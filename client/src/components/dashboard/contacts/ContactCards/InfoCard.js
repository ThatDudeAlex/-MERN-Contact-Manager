import React, { useState } from "react";

// Material-UI Components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CardActions,
  CardContent,
  Divider,
  Avatar,
  Card,
} from "@material-ui/core";

// Material-UI Icons
import {
  PhoneIphone,
  Email,
  AccountCircle,
  Edit,
  Delete,
} from "@material-ui/icons";

import ModalCard from "./ModalCard";

// Styles
import { useStyles } from "../styles";

// API Calls
import { deleteContact } from "../../../../apis/contactsApi";

export default function Cards(props) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const { name, phoneNumber, email, _id, handleDeleteContacts } = props;


  const handleModal = () => {
    setModal(!modal);
  };

  const onSubmitDelete = async () => {
    // API call to delete contact
    const contactDeleted = await deleteContact(_id).then((res) => res);

    if (contactDeleted) handleDeleteContacts(_id);
  };

  const editModalProps = {
    ...props,
    handleModal,
    editCard: true,
    modalState: modal,
  };

  return (
    <Card className={classes.card}>
      <ModalCard {...editModalProps} />

      {/* Card Header  */}
      <List>
        <ListItem className={classes.cardHeaderItem}>
          {/* Contact Picture */}
          <Avatar className={classes.cardAvatar}>
            <AccountCircle className={classes.cardAvatarIcon} />
          </Avatar>
        </ListItem>

        <ListItem>
          {/* Contact Name */}
          <ListItemText
            disableTypography
            primary={name}
            className={classes.cardHeaderItem}
          />
        </ListItem>
      </List>

      {/* Card Body */}
      <CardContent>
        <List>
          {/* Phone Number */}
          <ListItem>
            <ListItemIcon>
              <PhoneIphone className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>{phoneNumber}</ListItemText>
          </ListItem>

          {/* Email */}
          <ListItem>
            <ListItemIcon>
              <Email className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>{email}</ListItemText>
          </ListItem>
        </List>
      </CardContent>

      <Divider variant="middle" />

      {/* Card Footer */}
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<Edit />}
          onClick={handleModal}
        >
          {" "}
          Edit{" "}
        </Button>

        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={onSubmitDelete}
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
