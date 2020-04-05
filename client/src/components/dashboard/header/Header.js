import React from "react";

// Material-UI Components
import {
  Typography, Grid, Container,
  Button, TextField, InputAdornment
} from "@material-ui/core";

// Icons
import {Add, Search} from '@material-ui/icons'

// Styles
import { useStyles } from "./headerStyles";

export default function Header(name) {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Contacts
      </Typography>

      <Grid container spacing={2} alignItems="center" justify="center">
        {/* Search Bar */}
        <Grid item>
          <TextField
            placeholder="Search Contacts"
            variant="outlined"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Add button */}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Container fluid className={classes.divider}></Container>

    </Grid>
  );
}
