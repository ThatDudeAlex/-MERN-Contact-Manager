import React, { useEffect, useState } from "react";

// Material-UI Components
import {
  Grid,
  Container,
  TextField,
  InputAdornment,
  Button,
  Grow,
  Typography,
} from "@material-ui/core";

// Material-UI Icons
import { Add, Search } from "@material-ui/icons";

// Custom Components
import InfoCard from "./ContactCards/InfoCard";
import ModalCard from "./ContactCards/ModalCard";

// Styles
import { useStyles } from "./styles/";
// API calls
import { getAllContacts } from "../../../apis/contactsApi";

// Displays all user contacts
export default function Contacts() {
  const classes = useStyles();

  // Initial States
  const [loading, setLoading] = useState(true);
  const [userContacts, setUserContacts] = useState([]);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [modalState, setModalState] = useState(false);
  const [numContacts, setNumContacts] = useState(0);

  // tracks userContacts and & updates searchedContacts when userContacts changes
  useEffect(() => {
    onLoad();
  }, []);

  // loads all user contacts into state
  const onLoad = async () => {
    let data = await getAllContacts();

    if (data) {
      setUserContacts(() => [...data.contacts]);
      setSearchedContacts(() => [...data.contacts]);
      setNumContacts(data.size);
    }
  };

  // SET STATE FUNCTIONS  /////////////////////////////////////////////////////////////

  // ----- UPDATE SEARCH BAR STATE ----- 
  const changeSearchString = (value) => {
    setSearchString(value);
  };

  // ----- TOGGLES ADD-CONTACT MODAL STATE ----- 
  const handleModal = () => {
    setModalState(!modalState);
  };

  // ----- ADD CONTACT TO STATE FUNCTIONS ----- 
  
  const addToState = (newContact, alphabeticIdx) => {
    setUserContacts((prevState) =>
      addContactHelper(prevState, newContact, alphabeticIdx)
    )
    setNumContacts((prevNumContactState) => prevNumContactState + 1);
  };

  const addToSearchedState = (newContact, alphabeticIdx) => {
    setSearchedContacts((prevState) =>
      addContactHelper(prevState, newContact, alphabeticIdx)
    );
  };

  const addContactHelper = (prevContactState, newContact, alphabeticIdx) => {
    return prevContactState.map((column, idx) => {
      if (idx !== alphabeticIdx) 
        return column;
      else if ((idx === alphabeticIdx) && ( !column ))
        return [newContact];
      else 
        return [...column, newContact];
    });
  };

  // ----- REMOVE CONTACT FROM STATE FUNCTIONS ----- 

  const removeFromState = (deletedContact, alphabeticIdx) => {
    setUserContacts(prevState => 
      removeContactHelper(prevState, deletedContact, alphabeticIdx)
    )
    setNumContacts((prevState) => prevState - 1);
  };

  const removeFromSearchedState = (deletedContact, alphabeticIdx) => {
    setSearchedContacts(prevState => 
      shrinkRemovedContact(prevState, deletedContact, alphabeticIdx)  
    )
    // wait for contact card to shrink then remove 
    setTimeout(() => {
      setSearchedContacts(prevState => 
        removeContactHelper(prevState, deletedContact, alphabeticIdx)
      )
    }, 250)
  };

  const shrinkRemovedContact = (prevContactState, deletedContact, alphabeticIdx) => {
    return prevContactState.map((column, idx) => {
      if (idx !== alphabeticIdx) 
        return column
      else
        return column.map(contact => {
          if(contact._id === deletedContact._id)
            return {...contact, visible: !contact.visible}
          else
            return contact
        })
    });
  };

  const removeContactHelper = (prevContactState, deletedContact, alphabeticIdx) => {
    return prevContactState.map((column, idx) => {
      if (idx !== alphabeticIdx) 
        return column
      else if ((idx === alphabeticIdx) && (column.length === 1))
        return null
      else
        return column.filter(contact => contact._id !== deletedContact._id)
    });
  };

  // ----- EDIT CONTACT INFO STATE FUNCTIONS ----- 

  const editFromState = (updatedContact, alphabeticIdx) => {
    setUserContacts(prevState => 
      editContactHelper(prevState, updatedContact, alphabeticIdx)  
    )
  };

  const editFromSearchedState = (updatedContact, alphabeticIdx) => {
    setSearchedContacts(prevState => 
      editContactHelper(prevState, updatedContact, alphabeticIdx)  
    )
  };

  const editContactHelper = (prevContactState, updatedContact, alphabeticIdx) => {
    return prevContactState.map((column, idx) => {
      if(idx !== alphabeticIdx)
        return column
      else 
        return column.map(contact => {
          if(contact._id === updatedContact._id)
            return updatedContact
          else
            return contact
        })
    })
  }

  // STATE CONTROLLER FUNCTIONS  //////////////////////////////////////////////////////

  // ----- ADD CONTACTS CONTROLLER -----
  const handleAddContact = (newContact) => {
    const alphabeticIdx = getContactIdx(newContact.name);
    const name = newContact.name.toLowerCase()
    const search = searchString.toLowerCase()

    if (name.includes(search)) {
      addToSearchedState(newContact, alphabeticIdx);
      addToState(newContact, alphabeticIdx);
    } else {
      addToState(newContact, alphabeticIdx)
    }
  };

  // ----- DELETE CONTACTS CONTROLLER -----
  const handleDeleteContact = (deletedContact) => {
    const alphabeticIdx = getContactIdx(deletedContact.name);

    removeFromSearchedState(deletedContact, alphabeticIdx);
    removeFromState(deletedContact, alphabeticIdx);
  };

  // ----- EDIT CONTACTS CONTROLLER -----
  const handleEditContact = (updContactInfo, prevContactInfo) => {
    const prevContAlphaIdx = getContactIdx(prevContactInfo.name);
    const alphabeticIdx = getContactIdx(updContactInfo.name);
    const name = updContactInfo.name.toLowerCase();
    const search = searchString.toLowerCase();

    if ( (prevContAlphaIdx !== alphabeticIdx) && (name.includes(search)) ) {
      removeFromSearchedState(prevContactInfo, prevContAlphaIdx);
      removeFromState(prevContactInfo, prevContAlphaIdx)
      addToSearchedState(updContactInfo, alphabeticIdx);
      addToState(updContactInfo, alphabeticIdx)
    }
    else if ( (prevContAlphaIdx !== alphabeticIdx) && (!name.includes(search)) ) {
      removeFromSearchedState(prevContactInfo, prevContAlphaIdx);
      removeFromState(prevContactInfo, prevContAlphaIdx)
      addToState(updContactInfo, alphabeticIdx)
    }
    else if ( (prevContAlphaIdx === alphabeticIdx) && (name.includes(search)) ) {
      editFromSearchedState(updContactInfo, alphabeticIdx)
      editFromState(updContactInfo, alphabeticIdx)
    }
  };

  // ----- SEARCH CONTACTS CONTROLLER -----
  const handleSearchBar = (event) => {
    changeSearchString(event.target.value);
    const searchString = event.target.value.toLowerCase();
    let filteredContacts = [];

    if (!searchString) 
      filteredContacts = userContacts.map(column => {
        if (!column) 
          return column

        return column.map(contact => contact)
      })
    else 
      filteredContacts = userContacts.map(column => {
        if (!column) 
          return column

        return column.filter(contact => 
            contact.name.toLowerCase().includes(searchString)
          )
      })

    setSearchedContacts(filteredContacts);
  };

  // UTILITY FUNCTIONS  ///////////////////////////////////////////////////////////////

  // ----- GETS THE ALPHABETIC POSITION OF THE STRINGS INITIAL LETTER  ----- 
  const getContactIdx = (string) => {
    const stringInitial = string[0].toLowerCase().charCodeAt(0);
    const firstLetterInAlphabet = "a".charCodeAt(0);
    const nonAlphabeticCharIndex = 26;
    let alphabeticIdx = stringInitial - firstLetterInAlphabet;

    if (alphabeticIdx > 25 || alphabeticIdx < 0)
      alphabeticIdx = nonAlphabeticCharIndex;

    return alphabeticIdx;
  };

  // COMPONENT FUNCTIONS  /////////////////////////////////////////////////////////////
  
  const loopSearchedContacts = (contact) => {
    // infoCardJSX = <InfoCard />

    return contact.map(contact => {
      // {console.log(contact.visible)}
        return <Grow
          in={contact.visible}
          key={contact._id}
          style={{ transformOrigin: "0 0 0" }}
          {...(contact.visible ? { timeout: 800 } : {})}
        >
          <InfoCard {...contact} {...cardFunctions} />
        </Grow>
    })
  }
  
  const letterHeader = (alphabeticIdx) => {
    let letterJSX = null;

    if(alphabeticIdx < 26)
      letterJSX = <div>{String.fromCharCode(65 + alphabeticIdx)}</div>
    else
      letterJSX = <div>#</div>

    return (
      <Grow
        in={searchedContacts[alphabeticIdx] && searchedContacts[alphabeticIdx].length > 0 ? true : false}
        style={{ transformOrigin: "0 0 0" }}
        {...(searchedContacts[alphabeticIdx] ? { timeout: 700 } : {})}
      >
        {letterJSX}
      </Grow>
    )
  }



  const cardFunctions = { handleEditContact, handleDeleteContact };
  return (
    <Container maxWidth="xl" style={{ paddingTop: "3.5%" }}>
      <ModalCard
        modalState={modalState}
        handleAddContact={handleAddContact}
        handleModal={handleModal}
        addCard
      />

      {/* SearchBar / AddBtn Container */}
      <Grid
        container
        className={classes.searchBarContainer}
        justify="center"
        alignContent="center"
      >
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
            disabled={modalState ? true : false}
            onClick={handleModal}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="row">
        {
          searchedContacts.map((column, idx) => {
            if(!column)
              return column

            {/* const cards = loopSearchedContacts(column) */}
            return(
              <div key={idx} style={{ width: "100%" }}>
                <div>
                  {letterHeader(idx)}
                </div>

                <div>
                  {column.map(contact => {
                    return (
                        <Grow
                          in={contact.visible}
                          key={contact._id}
                          style={{ transformOrigin: "0 0 0" }}
                          {...(contact.visible ? { timeout: 800 } : {})}
                        >
                          {/* <Grid item xs={12}> */}
                            <InfoCard
                              {...contact}
                              {...cardFunctions}
                            />
                          {/* </Grid> */}
                        </Grow>
                      );
                  })}
                </div>
              </div>
            )
          })
        }
        {/* {searchedContacts.map((alphabetLetter, idx) => {
          if (alphabetLetter && alphabetLetter.length > 0) {
            const letter = String.fromCharCode(65 + idx);
            return (
              <div key={idx} style={{ width: "100%" }}>
                <Grow
                  in={
                    searchedContacts[idx] && searchedContacts[idx].length > 0
                      ? true
                      : false
                  }
                  style={{ transformOrigin: "0 0 0" }}
                  {...(searchedContacts[idx] ? { timeout: 700 } : {})}
                >
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "20px",
                      marginBottom: "20px",
                      marginTop: "20px",
                      borderBottom: "solid black 2px",
                    }}
                  >
                    {letter}
                  </div>
                </Grow>

                <div>
                  {searchedContacts[idx] &&
                    searchedContacts[idx].map((contact) => {
                      return (
                        <Grow
                          in={contact.visible}
                          key={contact._id}
                          style={{ transformOrigin: "0 0 0" }}
                          {...(contact.visible ? { timeout: 800 } : {})}
                        > */}
                          {/* <Grid item xs={12}> */}
                            {/* <InfoCard
                              {...contact}
                              {...cardFunctions}
                            /> */}
                          {/* </Grid> */}
                        {/* </Grow>
                      );
                    })}
                </div>
              </div>
            );
          }
        })} */}
      </Grid>

      {/* <Grid container style={{ paddingTop: "4%" }} justify="center">
        {userContacts ? (
          <Grid item>
            <Typography>
              {numContacts > 0 ? `${numContacts} Contacts` : "No Contacts"}
            </Typography>
          </Grid>
        ) : null}
      </Grid> */}
    </Container>
  );
}

// ---- need clarification as to why this doesnt work ----

// setSearchedContacts(searchedContacts.map((colums, idx) => {
//   if (idx !== alphabeticIdx) return colums
//   if(idx === alphabeticIdx){
//     if(!colums) return [newContact]
//     else return [...colums, newContact]
//   }
// }))
// const contactState = userContacts.contacts

// if(contactState[alphabeticIdx] === null)
//   contactState[alphabeticIdx] = [newContact]
// else
//   contactState[alphabeticIdx] = [...contactState[alphabeticIdx], newContact]
// setUserContacts(contactState)

// -------- just in case info card render function ---------------
        /* {searchedContacts.map(contact => {
          return (
            <Grow in={contact.visible} key={contact._id} 
              style={{ transformOrigin: '0 0 0' }}
              {...(contact.visible ? { timeout: 1000 } : {})}
            >
              <Grid item xs={12}>
                <InfoCard hideContactCard={hideContactCard} {...contact} {...cardFunctions} />
              </Grid>
            </Grow>
          );
        })} */
