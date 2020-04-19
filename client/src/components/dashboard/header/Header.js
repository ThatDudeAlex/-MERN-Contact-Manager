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

// Icons
import { AccountCircle } from "@material-ui/icons";

// Styles
import { useStyles } from "./styles/";

// Components
// import Modal from "../modal/Modal";

// Dashboard header containing search bar & add/logout buttons
export default function Header({ context }) {
  const classes = useStyles();
  const history = useHistory();

  // logs user out and redirects them to '/'
  const logout = async () => {
    const logoutStatus = await logoutUser().then((res) => res);

    if (logoutStatus.success) {
      context.actions.handleLogout();
      history.replace("/");
    }
  };

  return (
    <Container maxWidth={false} className={classes.header}>
      <Container>
        {/* contacts banner */}
        <Grid container justify="flex-end" alignItems="center">
          {/* User Icon */}
          <Grid item className={classes.headerItems}>
            <AccountCircle fontSize="large" />
          </Grid>

          {/* Users Name */}
          <Grid
            item
            className={classes.headerItems}
            style={{
              marginLeft: "3px",
              paddingRight: "10px",
              borderRight: "solid white 1px",
            }}
          >
            <Typography variant="button"> {context.loggedinUser} </Typography>
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
