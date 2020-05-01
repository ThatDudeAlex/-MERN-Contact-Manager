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
  AddBox,
} from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

// Hooks
import { useForm } from "../../../hooks/useForm";

// API Calls
import { addContact, getUrl, putUrl, imgUpload } from "../../../../apis/contactsApi";

export default function Cards({ handleAddContacts, handleModal, context }) {
  const classes = useStyles();

  // const [contactPicture, setContactPicture] = useState();
  const [errorMsgs, setErrMsgs] = useState({});
  const [image, setImage] = useState({profile: null, preview: null})

  const [contactInfo, setContactInfo] = useForm({
    name: "",
    email: "",
    phoneNumber: "",
  });

  // const setDefaultAvatar = () => {
  //   if (contactPicture === "")
  //     return <AccountCircle className={classes.cardAvatarIcon} />;
  // };

  // Controls error messages state
  const handleErrState = (state) => {
    setErrMsgs(state.errors)
  };

  const handleImgSelection = (event) => {
    setImage({
      profile: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0])
    });
  };

  const onSubmitAdd = async(event) => {
    event.preventDefault();
    console.log(`${context.isAuthenticated.id}-${Date.now()}`)
    let s3Key = ""
    // let imgInfo = {};
    let file = {}
    let contentType = ""
    // let avatarExt = ""
    let options = {}

    
    if(image.profile){
      // imgInfo = {file: image.profile, contentType: image.profile.type}
      file = image.profile
      contentType = file.type
      s3Key = `${context.isAuthenticated.id}-${Date.now()}.${contentType.split('/')[1]}`
        options = {
        params: {
          Key: s3Key,
          ContentType: contentType
        },
        headers: {
          'Content-Type': contentType
        }
      };
      // avatarExt = contentType.split('/')[1]
    }
    
    
    const contactAdded = await addContact({...contactInfo, s3Key}, file, options, handleErrState);
    // console.log(contactAdded)
    // if(contactAdded.avatarKey){
    //   const options = {
    //     params: {
    //       Key: contactAdded.avatarKey,
    //       ContentType: contentType
    //     },
    //     headers: {
    //       'Content-Type': contentType
    //     }
    //   };

    //   await putUrl(file, options)
    // }
    

    
    // console.log(contactAdded)
    // const contactAdded = await addContact({...contactInfo}, handleErrState);

    // if (contactAdded && image) {
    //   const data = new FormData()
    //   data.append('contactId', contactAdded._id)
    //   data.append('profileImage', image)
    //   await imgUpload(data, contactAdded)
    // }
    // if(contactAdded){
      // setTimeout(() => {
        handleAddContacts(contactAdded);
       handleModal();
      // },180)
    // }
    
  };

  return (
    <Card className={`${classes.card} ${classes.modalCard}`}>
      <form onSubmit={onSubmitAdd} noValidate>
        {/* Card Header  */}
        <List>
          <ListItem className={classes.cardHeaderItem}>
            {/* Contact Avatar */}
            <Avatar
              src={image.preview ? image.preview : null}
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
            startIcon={<AddBox />}
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
      </form>
    </Card>
  );
}
