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
// API calls
import { getAllContacts } from "../../../apis/contactsApi";

// Displays all user contacts
export default function Contacts() {
  const classes = useStyles();

  // Initial States
  const [userContacts, setUserContacts] = useState([]);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [modalState, setModalState] = useState(false);

  // tracks userContacts and & updates searchedContacts when userContacts changes
  useEffect(() => {
    onLoad()
  }, []);

  // loads all user contacts into state
  const onLoad = async () => {
    const contacts = await getAllContacts();

    if (userContacts){
      setUserContacts([...contacts]);
      setSearchedContacts([...contacts])
    }
  };

  const addToState = (newContact) => {
    setUserContacts(prevState => ([...prevState, newContact]))
  }

  const addToSearchedState = (newContact) => {
    setSearchedContacts(prevState => ([...prevState, newContact]))
  }

  const removeFromState = (_id) => {
    setUserContacts(userContacts.filter(contact => {
      return contact._id !== _id
    }))
  }

  const removeFromSearchedState = (_id) => {
    setSearchedContacts(searchedContacts.filter(contact => {
      return contact._id !== _id
    }))
  }

  const editFromState = (updatedContact) => {
    console.log(updatedContact)
    setUserContacts(userContacts.map(contact => {
      if (contact._id === updatedContact._id) {
        // console.log('hi')
        return updatedContact
      }
      else return contact;
    }))
  }

  const editFromSearchedState = (updatedContact) => {
    setSearchedContacts(searchedContacts.map(contact => {
      if (contact._id === updatedContact._id){
        // console.log('hey')
        return updatedContact;
      } 
      else return contact;
    }))
  }
  
  const changeSearchString = (value) => {
    setSearchString(value)
  }

  const hideContactCard = (_id) => {
    setSearchedContacts(prevState => prevState.map(contact => {
      if(contact._id === _id) return {...contact, visible: !contact.visible}
      return contact
    }))
  }

  // closes new contact modal
  const handleModal = () => {
    setModalState(!modalState);
  };

  const handleAddContact = (newContact) => {
    const name = newContact.name.toLowerCase()
    const search = searchString.toLowerCase()

    if(name.includes(search)){
      addToState(newContact)
      addToSearchedState(newContact)
    } else{
      addToState(newContact)
    }
  }

  const handleDeleteContact = (deletedContact) => {
    const name = deletedContact.name.toLowerCase()
    const search = searchString.toLowerCase()

    if(name.includes(search)){
      removeFromState(deletedContact._id)
      removeFromSearchedState(deletedContact._id)
    } else{
      removeFromState(deletedContact._id)
    }
  }

  const handleEditContact = (updatedContact) => {
    const name = updatedContact.name.toLowerCase()
    const search = searchString.toLowerCase()
    console.log(name, ' === ', search)
    if(name.includes(search)){
      editFromState(updatedContact)
      editFromSearchedState(updatedContact)
    } else{
      editFromState(updatedContact)
      removeFromSearchedState(updatedContact._id)
    }
  }

  // filters viewable contacts based on user search input
  // also makes it so that when search bar is empty, searchedContacts = userContacts
  const handleSearchBar = (event) => {
    changeSearchString(event.target.value)
    const value = event.target.value.toLowerCase()

    const filteredContacts = userContacts.filter((contact) => {
      return contact.name.toLowerCase().includes(value);
    });
    setSearchedContacts(filteredContacts);
  };

  const cardFunctions = {handleEditContact, handleDeleteContact}
  return (
    <Container maxWidth="xl" style={{ paddingTop: "3.5%" }}>
      <ModalCard
        modalState={modalState}
        handleAddContact={handleAddContact}
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
        {searchedContacts.map(contact => {
          return (
            <Grow in={contact.visible} key={contact._id} 
              style={{ transformOrigin: '0 0 0' }}
              {...(contact.visible ? { timeout: 1000 } : {})}
            >
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <InfoCard hideContactCard={hideContactCard} {...contact} {...cardFunctions} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>

    </Container>
  );
}
