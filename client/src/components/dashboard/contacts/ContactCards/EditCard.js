import React, { useState } from "react";

// Material-UI Components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
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
  Person,
  PhotoCamera,
  Cancel,
  AccountCircle,
  Save
} from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

// API Calls
import { editContact } from "../../../../apis/contactsApi";

export default function Cards(props) {
  const classes = useStyles();

  const {
    _id,
    name,
    phone,
    email,
    handleModal,
    handleUpdateContacts,
  } = props;

  const [updatedInfo, setInfo] = useState({
    updatedName: name,
    updatedPhone: phone,
    updatedEmail: email,
  });

  const handleContactInfo = (event) => {
    const { name, value } = event.target;
    setInfo({ ...updatedInfo, [name]: value });
  };

  const onSubmitEdit = async (event) => {
    event.preventDefault();

    const updatedContact = {
      _id: _id,
      name: updatedInfo.updatedName,
      phoneNumber: updatedInfo.updatedPhone,
      email: updatedInfo.updatedEmail,
    };

    // API call to update contact info
    const contactEdited = await editContact(updatedContact).then((res) => res);

    if (contactEdited.success) {
      handleUpdateContacts(updatedContact);
      handleModal();
    }
  };

  return (
    <Card className={classes.card}>
      {/* Card Header  */}
      <List>
        <ListItem className={classes.cardHeaderItem}>
          {/* Contact Avatar */}
          <Avatar
            // src={contactImg}
            alt="contact image"
            className={classes.cardAvatar}
          >
            <AccountCircle className={classes.cardAvatarIcon} />
          </Avatar>
        </ListItem>

        {/* Upload Img Btn */}
        <ListItem className={classes.cardHeaderItem}>
          <input
            // onChange={handleImgSelection}
            style={{ display: "none" }}
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              startIcon={<PhotoCamera />}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
        </ListItem>
      </List>

      {/* Card Body */}
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <Person className={classes.cardIcon} />
            </ListItemIcon>

            {/* Name Input */}
            <ListItemText>
              <TextField
                name="updatedName"
                defaultValue={name}
                onChange={handleContactInfo}
                required
                label="updatedName"
                variant="outlined"
              />
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneIphone className={classes.cardIcon} />
            </ListItemIcon>

            {/* Phonenumber Input */}
            <ListItemText>
              <TextField
                name="updatedPhone"
                defaultValue={phone}
                onChange={handleContactInfo}
                type="tel"
                label="Phone Number"
                variant="outlined"
              />
            </ListItemText>
          </ListItem>

          {/* Email */}
          <ListItem>
            <ListItemIcon>
              <Email className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              <TextField
                name="updatedEmail"
                defaultValue={email}
                onChange={handleContactInfo}
                label="Email"
                type="email"
                variant="outlined"
              />
            </ListItemText>
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
          startIcon={<Save />}
          onClick={onSubmitEdit}
        >
          {" "}
          Save{" "}
        </Button>

        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<Cancel />}
          onClick={handleModal}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
