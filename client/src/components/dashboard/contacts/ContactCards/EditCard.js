import React, { useState, useEffect } from "react";

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
import { editContact, getUrl } from "../../../../apis/contactsApi";

export default function Cards({handleModal, handleUpdateContacts, ...props}) {
  const classes = useStyles();
  const {name, phoneNumber, email, ...rest} = props;

  const [updatedInfo, setInfo] = useForm({ name, phoneNumber, email });
  const [profileImg, setProfileImg] = useState();
  const [errorMsgs, setErrMsgs] = useState({});

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

  // Controls error messages state
  const handleErrState = (state) => {
    setErrMsgs(state.errors);
  };

  const onSubmitEdit = async (event) => {
    event.preventDefault();
    const updatedContact = {...rest, ...updatedInfo};

    // API call to update contact info
    const contactEdited = await editContact(updatedContact, handleErrState);

    if (contactEdited) {
      handleUpdateContacts(updatedContact);
      handleModal();
    }
  };

  return (
    <Card className={`${classes.card} ${classes.modalCard}`}>
      <form className={classes.form} onSubmit={onSubmitEdit} noValidate>
        {/* Card Header  */}
        <List>
          <ListItem className={classes.cardHeaderItem}>
            {/* Contact Avatar */}
            <Avatar
              src={profileImg ? profileImg : null}
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
        <CardContent className={errorMsgs.email ? classes.cardContentError : null}>
          <List>
            <ListItem className={errorMsgs.name ? classes.cardInputError : null}>
              <ListItemIcon>
                <Person className={classes.cardIcon} />
              </ListItemIcon>

              {/* Name Input */}
              <ListItemText>
                <TextField
                  name="name"
                  error={errorMsgs.name ? true : false}
                  helperText={errorMsgs.name}
                  defaultValue={name}
                  onChange={setInfo}
                  required
                  label="Contact Name"
                  variant="outlined"
                />
              </ListItemText>
            </ListItem>

            <ListItem className={errorMsgs.phoneNumber ? classes.cardInputError : null}>
              <ListItemIcon>
                <PhoneIphone className={classes.cardIcon} />
              </ListItemIcon>

              {/* Phonenumber Input */}
              <ListItemText>
                <TextField
                  name="phoneNumber"
                  error={errorMsgs.phoneNumber ? true : false}
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
            <ListItem className={errorMsgs.email ? classes.cardInputError : null}>
              <ListItemIcon>
                <Email className={classes.cardIcon} />
              </ListItemIcon>

              <ListItemText>
                <TextField
                  name="email"
                  error={errorMsgs.email ? true : false}
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
