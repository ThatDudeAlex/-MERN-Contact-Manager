import React, { useState } from "react";
import imageCompression from 'browser-image-compression';

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
  AddBox,
} from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

// Hooks
import { useForm } from "../../../hooks/useForm";

// API Calls
import { addContact } from "../../../../apis/contactsApi";

export default function Cards({ handleAddContact, handleModal, context }) {
  const classes = useStyles();
  // Initial States
  const [errorMsgs, setErrMsgs] = useState({});
  const [previewImage, setPreviewImage] = useState()
  const [s3Params, setParams] = useState({})
  const [submit, setSubmit] = useState(false)
  const [contactInfo, setContactInfo] = useForm({
    name: "",
    email: "",
    phoneNumber: "",
  });
  
  // --- state functions ---
  const errorMsgsState = (errors) => {
    setErrMsgs(() => errors)
  }

  const previewImageState = (file) => {
    setPreviewImage(() => URL.createObjectURL(file)
    );
  }

  const removePreviewImageState = () => {
    setPreviewImage(null)
  }

  const s3ParamsState = (file, s3Key, options) => {
    setParams(() =>({file, s3Key, options}))
  }

  const submitState = (bool) => {
    setSubmit(bool)
  }

  // --- State Controllers ---

  // Controls error messages state
  const handleErrState = (errors) => {
    errorMsgsState(errors)
    submitState(false)
  };

  const handleImgSelection = async(event) => {
    if(event.target.files.length === 0) return

    let options = { maxSizeMB: 0.1, maxWidthOrHeight: 360 }
    const file = await imageCompression(event.target.files[0], options)
    const contentType = file.type
    const s3Key = `${context.isAuthenticated.id}-${Date.now()}.${contentType.split('/')[1]}`

    options = {
      params: {
        Key: s3Key,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    }
    
    previewImageState(file)
    s3ParamsState(file, s3Key, options)
  };

  const removeSelectedImg = () => {
    previewImageState(null)
  }

  // --- Submit Controller ---
  const onSubmitAdd = async(event) => {
    event.preventDefault();
    submitState(true)
    // console.time('api')
    const contactAdded = await addContact(
      {...contactInfo, s3Key: s3Params.s3Key}, s3Params.file, s3Params.options, handleErrState
    );
    if(contactAdded){
        handleModal();
        handleAddContact(contactAdded);
    }
    // console.timeEnd('api')
  };




  return (
    <Card className={`${classes.card} ${classes.modalCard}`}>
      <form noValidate>
        {/* Card Header  */}
        <List>
          <ListItem className={classes.cardHeaderItem}>
            {/* Contact Avatar */}
            <Avatar
              src={previewImage ? previewImage : null}
              alt="contact image"
              className={classes.cardAvatar}
            >
              <AccountCircle className={classes.cardAvatarIcon} />
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

          {/* {previewImage && <ListItem className={classes.cardHeaderItem}>
            <Button
              startIcon={<Cancel />}
              size='small'
              onClick={removePreviewImageState}
              variant="outlined"
              color="secondary"
            >
              Remove
            </Button>
          </ListItem>} */}
        </List>

        {/* Card Body */}
        <CardContent className={errorMsgs.email ? classes.cardContentError : null}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Person className={classes.cardIcon} />
              </ListItemIcon>

              {/* Name Input */}
              <ListItemText>
                <TextField
                  name="name"
                  error={errorMsgs.name ? true : false}
                  helperText={errorMsgs.name}
                  onChange={setContactInfo}
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
                  error={errorMsgs.phoneNumber ? true : false}
                  helperText={errorMsgs.phoneNumber}
                  onChange={setContactInfo}
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
                  error={errorMsgs.email ? true : false}
                  helperText={errorMsgs.email}
                  onChange={setContactInfo}
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
            type="submit"
            disabled={submit? true : false}
            onClick={onSubmitAdd}
            startIcon={<AddBox />}
          >
            {" "}
            Add{" "}
          </Button>

          <Button
            onClick={handleModal}
            size="small"
            type="button"
            variant="outlined"
            color="secondary"
            startIcon={<Cancel />}
          >
            Cancel
          </Button>

        </CardActions>
      </form>
    </Card>
  );
}
