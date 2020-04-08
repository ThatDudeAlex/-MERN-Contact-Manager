import React, { useState } from "react";

// API library
import axios from "axios";

// Material-UI Components
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  TextField,
} from "@material-ui/core";

// Icons
import {
  AccountCircle,
  PhoneIphone,
  Email,
  Person,
  PhotoCamera,
  Save,
  Cancel,
} from "@material-ui/icons";

// Styles
import { useStyles } from "../contacts/styles";

export default function Cards({addContact, closeModal}) {
  const classes = useStyles();

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleContactInfo = (event) => {
    const { name, value } = event.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const [contactImg, setContactImg] = useState("");

  const handleImgSelection = (event) => {
    setContactImg(URL.createObjectURL(event.target.files[0]));
  };

  const setAvatar = () => {
    if (contactImg === "")
      return <AccountCircle className={classes.cardAvatarIcon} />;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const { name, email, phoneNumber } = contactInfo;
    const newContact = { name, email, phoneNumber };

    axios
      .post("http://localhost:5000/api/contacts/addContact", newContact, {
        withCredentials: true
      })
      .then((res) => {
        addContact(res.data.newContact);
        closeModal();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Card className={classes.card}>
      {/* Card Header */}
      <List>
        {/* Contact Avatar */}
        <ListItem className={classes.cardHeaderItem}>
          <Avatar
            src={contactImg}
            alt="contact image"
            className={classes.cardAvatar}
          >
            {setAvatar()}
          </Avatar>
        </ListItem>

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

      {/* Contact Info */}
      <CardContent className={classes.cardContent}>
        <List>
          {/* Contact Name */}
          <ListItem>
            <ListItemIcon>
              <Person className={classes.cardIcon} />
            </ListItemIcon>

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

          {/* Phone Number */}
          <ListItem>
            <ListItemIcon>
              <PhoneIphone className={classes.cardIcon} />
            </ListItemIcon>

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

      {/* Save/Cancel Actions */}
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={onSubmit}
          startIcon={<Save />}
        >
          {" "}
          Save{" "}
        </Button>
        <Button
          onClick={closeModal}
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
