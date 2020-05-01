import React from "react";

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

// Material-UI Icons
import { AccountCircle } from "@material-ui/icons";

// Styles
import { useStyles } from "../styles";

export default function Cards(props) {
  const classes = useStyles();
  const { name, handleModal, handleDeleteContacts } = props;


  return (
    <Card className={`${classes.card} ${classes.infoCard}`}>
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
          onClick={handleDeleteContacts}
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
