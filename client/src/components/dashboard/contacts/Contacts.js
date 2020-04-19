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

// Icons
import { Add, Search } from "@material-ui/icons";

// Components
import Cards from "../contactCards/Cards";
import Modal from "../modal/Modal";

// Styles
import { useStyles } from "./styles/";

// Displays all user contacts
export default function Contacts({ userContacts, handleAddContacts, ...props }) {
  const classes = useStyles();

  // Initial States
  const [visibleContacts, setVisibleContacts] = useState(userContacts);
  const [contactsLoaded, setContactsLoaded] = useState(false);
  const [modalState, setModalState] = useState(false);

  // tracks userContacts and & updates visibleContacts when userContacts changes
  useEffect(() => {
    setVisibleContacts(userContacts);
  }, [userContacts]);

  // once all contacts are loaded, displays them
  useEffect(() => {
    setContactsLoaded(true);
  }, [visibleContacts]);

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
      <Modal
        modalState={modalState}
        handleAddContacts={handleAddContacts}
        handleModal={handleModal}
        addModal
      />

      <Grid container justify="center" alignContent="center">
        {/* Search Bar */}
        <Grid item className={classes.searchBarContainer}>
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
        {visibleContacts.map((contact) => {
          const { name, email, phoneNumber, _id } = contact;
          const contactInfo = {
            name,
            email,
            phone: phoneNumber,
            contactId: _id,
            ...props,
          };

          return (
            <Grow in={contactsLoaded} key={contact._id}>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Cards infoCard {...contactInfo} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>

        {/* <Divider variant="middle" />
      <Grid container justify="center">
        <Typography variant="h4"> {`Number of Contacts: `} </Typography>
      </Grid> */}
    </Container>
  );
}
