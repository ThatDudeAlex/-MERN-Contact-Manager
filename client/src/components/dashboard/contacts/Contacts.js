import React, { useEffect, useState } from "react";

// Material-UI Components
import {
  Grid,
  Container,
  TextField,
  InputAdornment,
  Button,
  Grow
} from "@material-ui/core";

// Material-UI Icons
import { Add, Search } from "@material-ui/icons";

// Custom Components
import InfoCard from "./ContactCards/InfoCard"
import ModalCard from "./ContactCards/ModalCard";

// Styles
import { useStyles } from "./styles/";

// Displays all user contacts
export default function Contacts({ userContacts, handleAddContacts, ...props }) {
  const classes = useStyles();

  // Initial States
  const [visibleContacts, setVisibleContacts] = useState(userContacts);
  const [modalState, setModalState] = useState(false);

  // tracks userContacts and & updates visibleContacts when userContacts changes
  useEffect(() => {
    // console.log(userContacts)
    setVisibleContacts(userContacts)
  }, [userContacts]);

  // console.log(userContacts)

  const hideContactCard = (_id) => {
    setVisibleContacts(prevState => prevState.map(contact => {
      if(contact._id === _id) return {...contact, visible: !contact.visible}
      return contact
    }))
  }

  // filters viewable contacts based on user input
  const handleSearchBar = (event) => {
    const nameSearched = event.target.value;

    const filteredContacts = userContacts.filter((contact) => {
      return contact.name.toLowerCase().includes(nameSearched);
    });

    setVisibleContacts(filteredContacts);
  };

  // closes new contact modal
  const handleModal = () => {
    setModalState(!modalState);
  };

  return (
    <Container maxWidth="xl" style={{ paddingTop: "3.5%" }}>
      <ModalCard
        modalState={modalState}
        handleAddContacts={handleAddContacts}
        handleModal={handleModal}
        addCard
      />

      <Grid container className={classes.searchBarContainer} justify="center" alignContent="center">
        {/* Search Bar */}
        <Grid item>
          <TextField
            placeholder="Search Contacts"
            variant="outlined"
            type="search"
            fullWidth
            size="small"
            name="searchBar"
            onChange={handleSearchBar}
            InputProps={{
              className: classes.searchBar,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Add button */}
        <Grid item className={classes.headerItems}>
          <Button
            className={classes.addBtn}
            size="medium"
            startIcon={<Add />}
            onClick={handleModal}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="row">
        {/* Iterates user contacts array and creates a card for each one */}
        {visibleContacts.map(contact => {
          return (
            <Grow in={contact.visible} key={contact._id} 
              style={{ transformOrigin: '0 0 0' }}
              {...(contact.visible ? { timeout: 1000 } : {})}
            >
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <InfoCard hideContactCard={hideContactCard} {...contact} {...props}  />
              </Grid>
            </Grow>
          );
        })}
      </Grid>

    </Container>
  );
}
