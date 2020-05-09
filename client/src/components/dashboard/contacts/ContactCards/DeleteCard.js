import React, {useState, useEffect} from "react";

// Material-UI Components
import {
  List,
  ListItem,
  ListItemText,
  Button,
  CardActions,
  CardContent,
  Divider,
  Avatar,
  Card,
} from "@material-ui/core";

import {getUrl} from '../../../../apis/contactsApi'

// Material-UI Icons
import { AccountCircle } from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

export default function Cards(props) {
  const classes = useStyles();
  const [profileImg, setProfileImg] = useState();

  const { name, handleModal, handleDeleteContact } = props;

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

  return (
    <Card className={`${classes.card} ${classes.infoCard}`}>
      {/* Card Header  */}
      <List>
        <ListItem className={classes.cardHeaderItem}>
          {/* Contact Picture */}
          <Avatar 
            src={profileImg ? profileImg : null} 
            className={classes.cardAvatar}
          >
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
          <ListItem>
            <ListItemText><strong>Are you sure you want to delete this contact?</strong></ListItemText>
          </ListItem>
        </List>
      </CardContent>

      <Divider variant="middle" />

      {/* Card Footer */}
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={handleDeleteContact}
        >
          {" "}
          Delete{" "}
        </Button>

        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleModal}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
