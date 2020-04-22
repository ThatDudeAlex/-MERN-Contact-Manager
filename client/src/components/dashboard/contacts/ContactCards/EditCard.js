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
  Save,
} from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

// Hooks
import { useForm } from "../../../hooks/useForm";

// API Calls
import { editContact } from "../../../../apis/contactsApi";

export default function Cards(props) {
  const classes = useStyles();
  console.log(props)

  const { _id, name, phoneNumber, email, handleModal, handleUpdateContacts } = props;

  const [updatedInfo, setInfo] = useForm({ name, phoneNumber, email });
  const [errorMsgs, setErrMsgs] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  console.log(errorMsgs)
  // Controls error messages state
  const handleErrState = (state) => {
    setErrMsgs(state);
  };

  const onSubmitEdit = async (event) => {
    event.preventDefault();

    const updatedContact = {
      _id, ...updatedInfo
      // name: updatedInfo.name,
      // phoneNumber: updatedInfo.phoneNumber,
      // email: updatedInfo.email,
    };

    // API call to update contact info
    const contactEdited = await editContact(updatedContact, handleErrState);

    if (contactEdited) {
      handleUpdateContacts(updatedContact);
      handleModal();
    }
  };

  return (
    <Card className={classes.card}>
      <form className={classes.form} onSubmit={onSubmitEdit} noValidate>
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
                  name="name"
                  error={errorMsgs.name.length === 0 ? false : true}
                  helperText={errorMsgs.name}
                  defaultValue={name}
                  onChange={setInfo}
                  required
                  label="Contact Name"
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
                  name="phoneNumber"
                  error={errorMsgs.phoneNumber.length === 0 ? false : true}
                  helperText={errorMsgs.phoneNumber}
                  defaultValue={phoneNumber}
                  onChange={setInfo}
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
                  name="email"
                  error={errorMsgs.email.length === 0 ? false : true}
                  helperText={errorMsgs.email}
                  defaultValue={email}
                  onChange={setInfo}
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
            type="submit"
            variant="outlined"
            color="primary"
            startIcon={<Save />}
            // onClick={onSubmitEdit}
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
      </form>
    </Card>
  );
}