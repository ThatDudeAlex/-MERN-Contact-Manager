import React, { useState, Fragment } from "react";

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
} from "@material-ui/core";

// Icons
import {
  PhoneIphone,
  Email,
  Person,
  PhotoCamera,
  Edit,
  Save,
  Cancel,
  Delete,
  AccountCircle,
  AddBox,
} from "@material-ui/icons";

// Components
import Modal from "../../modal/Modal";

// Styles
import { useStyles } from "../styles";

// API Calls
import {addContact, editContact, deleteContact} from "../../../../apis/contactsApi";

// Card used to display available contact information
export function ContactInfoCard(props) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const {
    name,
    phone,
    email,
    contactId,
    handleUpdateContacts,
    handleDeleteContacts,
  } = props;

  // closes card modal
  const handleModal = () => {
    setModal(!modal);
  };

  const onSubmitDelete = async() => {
    // API call to delete contact
    const contactDeleted =  await deleteContact(contactId).then(res => res)

    if(contactDeleted) handleDeleteContacts(contactId)
  };

  return (
    <Fragment>
      <Modal
        modalState={modal}
        handleModal={handleModal}
        editModal
        contactId={contactId}
        name={name}
        email={email}
        phone={phone}
        handleDeleteContacts={handleDeleteContacts}
        handleUpdateContacts={handleUpdateContacts}
      />
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

            <ListItemText>{phone}</ListItemText>
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
    </Fragment>
  );
}


// Card used to add a new contact infomartion
export function NewContanctCard({ handleModal, handleAddContacts }) {
  const classes = useStyles();

  // const [contactPicture, setContactPicture] = usePicture()
  const [contactPicture, setContactPicture] = useState()
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const setDefaultAvatar = () => {
    if (contactPicture === "")
      return <AccountCircle className={classes.cardAvatarIcon} />
  }

  const handleImgSelection = (event) => {
    console.log(contactPicture)
    setContactPicture(URL.createObjectURL(event.target.files[0]))
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
    <Fragment>
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
    </Fragment>
  );
}

// Card used to edit available contact information
export function EditContactCard(props) {
  const classes = useStyles();

  const {
    contactId,
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
      contactId: contactId,
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
    <Fragment>
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
    </Fragment>
  );
}
