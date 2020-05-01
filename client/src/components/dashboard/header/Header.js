import React from "react";
import { useHistory } from "react-router-dom";

import { logoutUser } from "../../../apis/usersApi";

// Material-UI Components
import {
  Typography,
  Grid,
  Container,
  Button,
} from "@material-ui/core";

// Material-UI Icons
import { AccountCircle } from "@material-ui/icons";

// Styles
import { useStyles } from "./styles/";


// Dashboard header containing search bar & add/logout buttons
export default function Header({ context }) {
  const classes = useStyles();
  const history = useHistory();

  // logs user out and redirects them to '/'
  const logout = async () => {
    await logoutUser();
    
    context.actions.handleLogout();
    history.replace("/");
  };

  return (
    <Container maxWidth={false} className={classes.header}>
      <Container>
        {/* contacts banner */}
        <Grid className={classes.headerContainer} container alignItems="center">
          {/* User Icon */}
          <Grid item className={classes.headerItem}>
            <AccountCircle fontSize="large" />
          </Grid>

          {/* Users Name */}
          <Grid
            item
            className={`${classes.headerName} ${classes.headerItem}`}
          >
            <Typography variant="button"> {context.isAuthenticated.name} </Typography>
          </Grid>

          {/* Logout Button */}
          <Grid item>
            <Button
              style={{ color: "white" }}
              className={classes.logoutBtn}
              size="large"
              onClick={logout}
            >
              logout
            </Button>
          </Grid>
        </Grid>
      </Container>

    </Container>
  );
}
