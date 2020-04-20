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
  Card
} from "@material-ui/core";

// Material-UI Icons
import {
  PhoneIphone,
  Email,
  Person,
  PhotoCamera,
  Cancel,
  AccountCircle,
  AddBox,
} from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

// API Calls
import { addContact } from "../../../../apis/contactsApi";

export default function Cards({handleAddContacts, handleModal}) {
  const classes = useStyles();

  const [contactPicture, setContactPicture] = useState();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const setDefaultAvatar = () => {
    if (contactPicture === "")
      return <AccountCircle className={classes.cardAvatarIcon} />;
  };

  const handleImgSelection = (event) => {
    console.log(contactPicture);
    setContactPicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleContactInfo = (event) => {
    const { name, value } = event.target;

    setContactInfo({ ...contactInfo, [name]: value });
  };

  const onSubmitAdd = async (event) => {
    event.preventDefault();

    const newContact = {
      name: contactInfo.name,
      email: contactInfo.email,
      phoneNumber: contactInfo.phoneNumber,
    };

    // API call to add new contact
    const contactAdded = await addContact(newContact).then((res) => res);

    if (contactAdded.success) {
      handleAddContacts(contactAdded.newContact);
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
            src={contactPicture}
            alt="contact image"
            className={classes.cardAvatar}
          >
            {setDefaultAvatar()}
            {/* <AccountCircle className={classes.cardAvatarIcon} /> */}
          </Avatar>
        </ListItem>

        {/* Upload Img Btn */}
        <ListItem className={classes.cardHeaderItem}>
          <input
            onChange={handleImgSelection}
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
                onChange={handleContactInfo}
                required
                label="Name"
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
                name="email"
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
          startIcon={<AddBox />}
          onClick={onSubmitAdd}
        >
          {" "}
          Add{" "}
        </Button>
        <Button
          onClick={handleModal}
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<Cancel />}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
