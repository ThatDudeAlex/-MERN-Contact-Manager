import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// Material-UI Components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CardActions,
  Divider,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  ListItemAvatar,
  Collapse,
  Grow,
} from "@material-ui/core";

// Material-UI Icons
import {
  PhoneIphone,
  Email,
  AccountCircle,
  Edit,
  Delete,
} from "@material-ui/icons";

import ModalCard from "./ModalCard";

// Styles
import { useStyles } from "../styles";

// API Calls
import { deleteContact, getUrl } from "../../../../apis/contactsApi";

export default function Cards({handleDeleteContact, handleEditContact, ...props}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const isTabletOrMobile = useMediaQuery({ 
    query: "(max-width: 1280px)" 
  });

  const classes = useStyles();
  const [profileImg, setProfileImg] = useState();
  const [visibility, setVisibility] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (props.avatarKey)
       onload();
    else 
      setVisibility(!visibility);
  }, []);

  const onload = async () => {
    const options = {
      params: { Key: props.avatarKey },
    };
    const imgUrl = await getUrl(options);

    profileImgState(imgUrl);
    setVisibility(!visibility);
  };

  const profileImgState = (imgUrl) => {
    setProfileImg(() => imgUrl);
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const onSubmitDelete = async () => {
    const deletedContact = getCurrInfo();

    setVisibility(!visibility);
    await deleteContact(deletedContact); // API call to delete contact

    handleDeleteModal();
    handleDeleteContact(deletedContact);
  };


  const getCurrInfo = () => {
    if (props.avatarKey) 
      return { name: props.name, _id: props._id, avatarKey: props.avatarKey }
    return { name: props.name, _id: props._id }
  }

  const AttributeList = () => {
    return (
      <List className={classes.cardList}>
        <ListItem>
          <ListItemIcon>
            <PhoneIphone className={classes.cardIcon} />
          </ListItemIcon>
          <ListItemText>{props.phoneNumber}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Email className={classes.cardIcon} />
          </ListItemIcon>
          <ListItemText>{props.email}</ListItemText>
        </ListItem>

        <Divider variant="middle" />

        <ListItem>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEditModal}
            >
              {" "}
              Edit{" "}
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleDeleteModal}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </CardActions>
        </ListItem>
      </List>
    );
  };

  const editModalProps = {
    ...props,
    handleEditContact,
    changeProfileImg: profileImgState,
    handleModal: handleEditModal,
    editCard: true,
    modalState: editModal,
  };

  const delModalProps = {
    ...props,
    handleDeleteContact: onSubmitDelete,
    handleModal: handleDeleteModal,
    deleteCard: true,
    modalState: deleteModal,
  };

  return (
    <Grow
      in={visibility}
      style={{ transformOrigin: "0 0 0" }}
      {...(visibility ? { timeout: 850 } : {})}
    >
      <Card className={`${classes.card} ${classes.infoCard} ${classes.paper}`}>
        <ModalCard {...editModalProps} />
        <ModalCard {...delModalProps} />

        <List className={classes.cardList}>
          <Grid container alignItems="center">
            
            <Grid item xs={12} lg={3}>
              <CardActionArea
                disabled={window.innerWidth >= 1280 ? true : false}
                onClick={handleExpanded}
              >
                <ListItem>
                  <ListItemAvatar>
                    {/* {profileImg ? <Avatar src={profileImg} /> : <AccountCircle style={{fontSize: "50px" }} /> } */}
                    <Avatar src={profileImg ? profileImg : null} style={{fontSize: "40px", backgroundColor: '#1976d2'}}>
                      <AccountCircle style={{fontSize: "40px", color: 'white'}} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={props.name} />
                </ListItem>
              </CardActionArea>
            </Grid>

            <Grid item xs={12} lg={9}>
              {isTabletOrMobile && (
                <Collapse in={expanded} timeout={500}>
                  <AttributeList />
                </Collapse>
              )}

              {isDesktopOrLaptop && <AttributeList />}
            </Grid>
            
          </Grid>
        </List>
      </Card>
    </Grow>
  );
}
