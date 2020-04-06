import React from "react";

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

export default function Header({openModal}) {
  const classes = useStyles();

  return (
    <Container maxWidth={false}  className={classes.header} >
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
            onClick={openModal}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
