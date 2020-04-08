import React, {useState} from "react";

// API library
import axios from "axios";

// Material-UI Components
import {
  Button, Card, CardActions, CardContent,
  List, ListItem, ListItemIcon, ListItemText,
  Divider, Avatar,TextField
} from "@material-ui/core";

// Icons
import { 
  AccountCircle, Delete, Edit, PhoneIphone, Email, PhotoCamera, Person
} from "@material-ui/icons";

// Styles
import {useStyles} from './styles'

export default function Cards({name, phone, email, contactId, deleteContact}) {
  const classes= useStyles()
  const [editMode, setEditMode] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleContactInfo = (event) => {
    const { name, value } = event.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleEditMode = () =>{
    setEditMode(!editMode)
  }


  const handleDeleteContact = () =>{
    axios.delete('http://localhost:5000/api/contacts/deleteContact', {data: {contactId}}, {withCredentials: true})
    .then(res => {
      console.log(res.data)

      if(res.data.success)
        deleteContact(contactId)
    })
  }



  const cardHeader = () => {
    if(editMode){
      return(
        <List style={{paddingLeft:'16px'}}>
          {/* <ListItem className={classes.cardHeaderItem}>
              <Avatar style={{width:'60px', height: '60px'}} className={classes.cardAvatar}>
                <AccountCircle style={{fontSize:'40px'}} className={classes.cardAvatarIcon} />
              </Avatar>
        </ListItem> */}
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
           {/* Contact Name */}
           {/* <ListItem>
            <ListItemIcon>
              <Person className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              <TextField
                name="name"
                size='small'
                onChange={handleContactInfo}
                required
                defaultValue={name}
                label="Name"
                variant="outlined"
              />
            </ListItemText>
          </ListItem> */}
        </List>
      )
    }
    else if (!editMode){
      return(
        <List>
        <ListItem className={classes.cardHeaderItem}>
              <Avatar className={classes.cardAvatar}>
                <AccountCircle className={classes.cardAvatarIcon} />
              </Avatar>
        </ListItem>

        <ListItem>
          <ListItemText disableTypography primary={name} className={classes.cardHeaderItem} />
        </ListItem>
        </List>
      )
    }
  }

  const cardBody = () => {
    if(editMode){
      return(
        <List>
          {/* Contact Name */}
          <ListItem>
            <ListItemIcon>
              <Person className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              <TextField
                name="name"
                size='small'
                onChange={handleContactInfo}
                required
                defaultValue={name}
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
                size='small'
                label="Phone Number"
                variant="outlined"
                defaultValue={phone}
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
                defaultValue={email}
                label="Email"
                size='small'
                type="email"
                variant="outlined"
              />
            </ListItemText>
          </ListItem>
        </List>
      )
    }
    else{
      return(
        <List>
          {/* Phone Number */}
          <ListItem>
            <ListItemIcon>
              <PhoneIphone className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              {phone}
            </ListItemText>
          </ListItem>

          {/* Email */}
          <ListItem>
            <ListItemIcon>
              <Email className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              {email}
            </ListItemText>
          </ListItem>
        </List>
      )
    }
  }

  return (
    <Card className={classes.card}>

        {/* Card Header */}
        {/* <List> */}
          {/* Contact Avatar */}
          {/* <ListItem className={classes.cardHeaderItem}>
              <Avatar className={classes.cardAvatar}>
                <AccountCircle className={classes.cardAvatarIcon} />
              </Avatar>
          </ListItem> */}

          {/* Contact Name */}
          {cardHeader()}
          {/* <ListItem>
            <ListItemText disableTypography primary={name} className={classes.cardHeaderItem} />
          </ListItem> */}
        {/* </List> */}

      {/* Contact Info */}
      <CardContent className={classes.cardContent}>
      {cardBody()}
        {/* <List>
          Phone Number
          <ListItem>
            <ListItemIcon>
              <PhoneIphone className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              {phone}
            </ListItemText>
          </ListItem>

          Email
          <ListItem>
            <ListItemIcon>
              <Email className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>
              {email}
            </ListItemText>
          </ListItem>
        </List> */}
      </CardContent>

      <Divider variant="middle" />
      
      {/* Edit/Delete Actions */}
      <CardActions>
        <Button onClick={handleEditMode} size="small" variant='outlined' color='primary' startIcon={<Edit />}>
          {" "}
          Edit{" "}
        </Button>
        <Button onClick={handleDeleteContact} size="small"  variant='outlined' color='secondary' startIcon={<Delete />}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
