import React from "react";

// Material-UI Components
import {
  Button, Card, CardActions, CardContent,
  List, ListItem, ListItemIcon, ListItemText,
  Divider, Avatar
} from "@material-ui/core";

// Icons
import { 
  AccountCircle, Delete, Edit, PhoneIphone, Email
} from "@material-ui/icons";

// Styles
import {useStyles} from './styles'

export default function Cards({name, phone, email}) {
  const classes= useStyles()
  
  return (
    <Card className={classes.card}>

        {/* Card Header */}
        <List>
          {/* Contact Avatar */}
          <ListItem className={classes.cardHeaderItem}>
              <Avatar className={classes.cardAvatar}>
                <AccountCircle className={classes.cardAvatarIcon} />
              </Avatar>
          </ListItem>

          {/* Contact Name */}
          <ListItem>
            <ListItemText disableTypography primary={name} className={classes.cardHeaderItem} />
          </ListItem>
        </List>

      {/* Contact Info */}
      <CardContent className={classes.cardContent}>
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
      </CardContent>

      <Divider variant="middle" />
      
      {/* Edit/Delete Contact */}
      <CardActions>
        <Button size="small" variant='outlined' color='primary' startIcon={<Edit />}>
          {" "}
          Edit{" "}
        </Button>
        <Button size="small"  variant='outlined' color='secondary' startIcon={<Delete />}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}