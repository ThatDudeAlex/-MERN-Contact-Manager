import React, {useState} from "react";

// Material-UI Components
import {
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";

// Icons
import { Add, Search } from "@material-ui/icons";

// Styles
import { useStyles } from "./styles";

// Components
import Modal from "../modal/Modal";

export default function Header({handleAddContacts}) {
  const classes = useStyles();
  
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };


  return (
    <Container maxWidth={false}  className={classes.header} >
      <Modal modalState={modal} handleAddContacts={handleAddContacts} handleModal={handleModal} addModal/>

      <Grid container alignItems="center" justify="center" >

        {/* contacts banner */}
        <Grid item className={classes.headerItems}>
          <Typography variant="h4"> Contacts </Typography>
        </Grid>

        {/* Search Bar */}
        <Grid item className={classes.headerItems}>
          <TextField
            placeholder="Search Contacts"
            variant="outlined"
            type="search"
            // onChange={handleFilterContact}
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
            variant="contained"
            className={classes.addBtn}
            size="large"
            startIcon={<Add />}
            onClick={handleModal}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
