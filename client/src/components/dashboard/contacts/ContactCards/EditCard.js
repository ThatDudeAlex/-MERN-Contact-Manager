import React, { useState, useEffect } from "react";
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
  Save,
} from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

// Hooks
import { useForm } from "../../../hooks/useForm";

// API Calls
import { editContact, getUrl } from "../../../../apis/contactsApi";

export default function Cards({handleModal, handleEditContact, context, ...props}) {
  const classes = useStyles();
  const {name, phoneNumber, email, ...rest} = props;

  // Initial States
  const [updatedInfo, setInfo] = useForm({ name, phoneNumber, email });
  const [profileImg, setProfileImg] = useState();
  const [errorMsgs, setErrMsgs] = useState({});
  const [previewImage, setPreviewImage] = useState()
  const [s3Params, setParams] = useState({})
  const [submit, setSubmit] = useState(false)

  // --- on component loading functions ---
  useEffect(() => {
    if (props.avatarKey)
      onload()
  }, [])

  const onload = async() => {
    const options = {
      params: { Key: props.avatarKey }
    };
    const imgUrl = await getUrl(options)
    profileImgState(imgUrl)
  }

  // --- state functions ---
  const profileImgState = (imgUrl) => {
    setProfileImg(() => imgUrl)
  }

  const errorMsgsState = (errors) => {
    setErrMsgs(() => errors)
  }

  const previewImageState = (file) => {
    setPreviewImage(() => URL.createObjectURL(file)
    );
  }

  const s3ParamsState = (file, s3Key, options) => {
    setParams(() =>({file, s3Key, options}))
  }

  const submitState = (value) => {
    setSubmit(() => value)
  }


  // --- State Controllers ---

  // Controls error messages state
  const handleErrState = (errors) => {
    errorMsgsState(errors);
  };

  const handleImgSelection = async(event) => {
    if(event.target.files.length === 0) return

    let options = { maxSizeMB: 0.1, maxWidthOrHeight: 360 }
    const file = await imageCompression(event.target.files[0], options)
    const contentType = file.type
    const s3Key = `${context.isAuthenticated.id}-${Date.now()}.${contentType.split('/')[1]}`

    console.log(s3Key)
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

  // --- Submit Controller ---
  const onSubmitEdit = async (event) => {
    event.preventDefault();
    const {avatarKey} = rest
    let updatedContact = {};

    console.log(avatarKey)

    if (s3Params.file){
      // console.log('hiii')
      updatedContact = {avatarKey: s3Params.s3Key, ...rest, ...updatedInfo}
    }
    else
      updatedContact = {avatarKey, ...rest, ...updatedInfo}
    // console.log(updatedContact.avatarKey)
    // API call to update contact info
    const contactEdited = await editContact(
      {...updatedContact, s3Key: s3Params.s3Key}, s3Params.file, s3Params.options, handleErrState
    );

    if (contactEdited) {
      handleEditContact(updatedContact);
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
              src={previewImage ? previewImage : (
                profileImg ? profileImg : null
              )}
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
