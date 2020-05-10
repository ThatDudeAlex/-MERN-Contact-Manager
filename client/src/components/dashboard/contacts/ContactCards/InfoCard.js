import React, { useState, useEffect } from "react";

// Material-UI Components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CardActions,
  CardContent,
  Divider,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  ListItemAvatar,
  Typography,
  IconButton,
  Collapse,
  Grow,
  ListItemSecondaryAction,
} from "@material-ui/core";

// Material-UI Icons
import {
  PhoneIphone,
  Email,
  AccountCircle,
  Edit,
  Delete,
  Visibility,
  ExpandMore,
} from "@material-ui/icons";

import ModalCard from "./ModalCard";

// Styles
import { useStyles } from "../styles";

// API Calls
import { deleteContact, getUrl } from "../../../../apis/contactsApi";

export default function Cards({
  handleDeleteContact,
  handleEditContact,
  ...props
}) {
  const classes = useStyles();
  const [profileImg, setProfileImg] = useState();
  const [visibility, setVisibility] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [screen, setScreen] = useState(400)
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (props.avatarKey) 
      onload();
    else
      setVisibility(!visibility)

    if (window.innerWidth >= 1280) 
      setExpanded(true);

    // const debouncedHandleResize = debounce(function handleResize() {
    //   setScreen(window.innerWidth)
    // }, 1000)
    
    // window.addEventListener("resize", debouncedHandleResize);

    return () => {
      console.log('compounent unmounted')
      // window.removeEventListener("resize", debouncedHandleResize);
    }
  }, []);

  // function debounce(fn, ms) {
  //   let timer
  //   return _ => {
  //     clearTimeout(timer)
  //     timer = setTimeout(_ => {
  //       timer = null
  //       fn.apply(this, arguments)
  //     }, ms)
  //   };
  // }


  const onload = async () => {
    const options = {
      params: { Key: props.avatarKey },
    };
    const imgUrl = await getUrl(options);

    // setScreen(window.innerWidth)
    profileImgState(imgUrl)
    setVisibility(!visibility)
  }

  // const resize = () => {
  //   if (window.innerWidth >= 1280) setExpanded(false);
  //   setScreen(window.innerWidth)
  //   // else setExpanded(false);
  // };


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

  const onSubmitDelete = async() => {
    const deletedContact = { name: props.name, _id: props._id };
    
    setVisibility(!visibility)
    await deleteContact(deletedContact._id) // API call to delete contact

    handleDeleteModal();
    handleDeleteContact(deletedContact);
  };

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
    )
  }


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
    <Card className={`${classes.card} ${classes.infoCard}`}>
      <ModalCard {...editModalProps} />
      <ModalCard {...delModalProps} />
      
      <List className={classes.cardList}>
        <Grid container alignItems='center'>

          <Grid item xs={12} lg={3}>
            <CardActionArea disabled={(window.innerWidth >= 1280)? true : false} onClick={handleExpanded}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={profileImg ? profileImg : null} />
                </ListItemAvatar>
                <ListItemText primary={props.name} />
              </ListItem>
            </CardActionArea>
          </Grid>

          <Grid item xs={12} lg={9}>
            {window.innerWidth < 1280 ?
              <Collapse in={expanded} timeout={500}>
                <AttributeList />
              </Collapse>
              :
              <AttributeList />
            }
            
          </Grid>

        </Grid>
      </List>
      
      {/* <Grid container> */}
      {/* Row 1 */}
      {/* <Grid item xs={12}>
          <Grid container justify="center"> */}
      {/* Row 1 - Col 1 */}
      {/*<Grid item xs={3} md={12}>
              <Grid container justify="center">
                <Grid item>
                  <Avatar
                    // style={{ height: "80px", width: "80px" }}
                    src={profileImg ? profileImg : null}
                    alt="contact image"
                    className={classes.cardAvatar}
                  >
                    <AccountCircle className={classes.cardAvatarIcon} />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>*/}

      {/* Row 1 - Col 2 */}
      {/* <Grid item xs={9}>
              <Grid container>
                <Grid item xs={12}>
                  <List>
                    <ListItem> */}
      {/* name */}
      {/* <ListItemText
                        disableTypography
                        primary={props.name}
                        className={classes.cardHeaderItem}
                      /> */}

      {/* expand button */}
      {/* <ListItemSecondaryAction>
                        <IconButton onClick={handleExpanded}>
                          <ExpandMore />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
      {/* End of Row 1 */}
      {/* </Grid> */}

      {/* Row 2 */}
      {/* <Grid item xs={12}>
          <Collapse in={expanded} timeout={400}>
            <CardContent>
              <List> */}
      {/* phone info */}
      {/* <ListItem>
                  <ListItemIcon>
                    <PhoneIphone className={classes.cardIcon} />
                  </ListItemIcon>
                  <ListItemText>{props.phoneNumber}</ListItemText>
                </ListItem> */}

      {/* email info */}
      {/* <ListItem>
                  <ListItemIcon>
                    <Email className={classes.cardIcon} />
                  </ListItemIcon>
                  <ListItemText>{props.email}</ListItemText>
                </ListItem>
              </List>
            </CardContent>

            <Divider variant="middle" />

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
          </Collapse> */}
      {/* End of Row 2 */}
      {/* </Grid>
      </Grid> */}
      {/* ---------------------------------------------------------------- */}
      {/* Card Header  */}
      {/* <List>
        <ListItem className={classes.cardHeaderItem}> */}
      {/* Contact Picture */}
      {/* <Avatar
            src={profileImg ? profileImg : null}
            alt="contact image"
            className={classes.cardAvatar}>
            <AccountCircle className={classes.cardAvatarIcon} />
          </Avatar>
        </ListItem>

      <ListItem> */}
      {/* Contact Name */}
      {/* <ListItemText
            disableTypography
            primary={props.name}
            className={classes.cardHeaderItem}
          />
        </ListItem>
      </List> */}

      {/* Card Body */}
      {/* <CardContent>
        <List> */}
      {/* Phone Number */}
      {/* <ListItem>
            <ListItemIcon>
              <PhoneIphone className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>{props.phoneNumber}</ListItemText>
        </ListItem> */}

      {/* Email */}
      {/* <ListItem>
            <ListItemIcon>
              <Email className={classes.cardIcon} />
            </ListItemIcon>

            <ListItemText>{props.email}</ListItemText>
          </ListItem>
        </List>
      </CardContent>

      <Divider variant="middle" /> */}

      {/* Card Footer */}
      {/* <CardActions>
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
      </CardActions> */}
    </Card>
    </Grow>
  );
}
