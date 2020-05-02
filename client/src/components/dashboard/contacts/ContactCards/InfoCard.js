import React, { useState, useEffect } from "react";

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
  Visibility,
} from "@material-ui/icons";

import ModalCard from "./ModalCard";

// Styles
import { useStyles } from "../styles";

// API Calls
import { deleteContact, getUrl } from "../../../../apis/contactsApi";

export default function Cards({handleDeleteContacts, handleUpdateContacts, ...props}) {
  const classes = useStyles();
  const [profileImg, setProfileImg] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (props.avatarKey)
      onload()
  }, [])

  const onload = async() => {
    const options = {
      params: { Key: props.avatarKey }
    };

    const imgUrl = await getUrl(options)
    setProfileImg(imgUrl)
  }

  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const onSubmitDelete = async () => {
    props.hideContactCard(props._id)
    handleDeleteModal()
    setTimeout(() => {handleDeleteContacts(props._id)}, 400)
    
    await deleteContact(props._id); // API call to delete contact
  };

  const editModalProps = {
    ...props,
    handleUpdateContacts,
    handleModal: handleEditModal,
    editCard: true,
    modalState: editModal,
  };

  const delModalProps = {
    ...props,
    handleDeleteContacts: onSubmitDelete,
    handleModal: handleDeleteModal,
    deleteCard: true,
    modalState: deleteModal,
  };

  return (
    <Card className={`${classes.card} ${classes.infoCard}`}>
      <ModalCard {...editModalProps} />
      <ModalCard {...delModalProps}  />

      {/* Card Header  */}
      <List>
        <ListItem className={classes.cardHeaderItem}>
          {/* Contact Picture */}
          <Avatar
            src={profileImg ? profileImg : null}
            alt="contact image"
            className={classes.cardAvatar}>
            <AccountCircle className={classes.cardAvatarIcon} />
          </Avatar>
        </ListItem>

        <ListItem>
          {/* Contact Name */}
          <ListItemText
            disableTypography
            primary={props.name}
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

            <ListItemText>{props.phoneNumber}</ListItemText>
          </ListItem>

          {/* Email */}
          <ListItem>
            <ListItemIcon>
              <Email className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>{props.email}</ListItemText>
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
          onClick={handleEditModal}
        >
          {" "}
          Edit{" "}
        </Button>

        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={handleDeleteModal}
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
